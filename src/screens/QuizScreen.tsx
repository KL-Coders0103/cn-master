import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { questionBank, Question } from "../data/questions";

export default function QuizScreen({ route, navigation }: any) {
  const { topic } = route.params || {};
  const questions: Question[] = topic ? questionBank[topic] : [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Prevent crash if topic invalid
  if (!topic || !questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Invalid Topic</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.optionText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAnswer = (selected: string) => {
    if (selected === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  // 🔥 Save score once when quiz completes
  useEffect(() => {
    if (!showResult) return;

    const saveScore = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      let newStreak = 1;

      if (userData?.lastQuizDate) {
        const lastDate = new Date(
          userData.lastQuizDate.seconds * 1000
        );
        lastDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - lastDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays === 0) {
          newStreak = userData.streak || 1;
        } else if (diffDays === 1) {
          newStreak = (userData.streak || 0) + 1;
        } else {
          newStreak = 1;
        }
      }

      await updateDoc(userRef, {
        totalScore: increment(score),
        totalAttempts: increment(1),
        streak: newStreak,
        lastQuizDate: new Date(),
      });

      await addDoc(
        collection(db, "users", currentUser.uid, "quizHistory"),
        {
          topic: topic,
          score: score,
          totalQuestions: questions.length,
          percentage: (score / questions.length) * 100,
          date: new Date(),
        }
      );
    };

    saveScore();
  }, [showResult]);

  // 🔥 Result Screen
  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Quiz Completed 🎉</Text>
        <Text style={styles.score}>
          Your Score: {score} / {questions.length}
        </Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
          }}
        >
          <Text style={styles.optionText}>Retry Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.optionText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🔥 Question Screen
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {topic} Quiz
      </Text>

      <Text style={{ marginBottom: 10 }}>
        Question {currentQuestion + 1}/{questions.length}
      </Text>

      <Text style={styles.question}>
        {questions[currentQuestion].question}
      </Text>

      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#2563eb",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  score: {
    fontSize: 22,
    marginBottom: 20,
  },
});