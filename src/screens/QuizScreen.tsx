import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

const questions = [
  {
    question: "How many layers are in OSI model?",
    options: ["4", "5", "7", "6"],
    answer: "7",
  },
  {
    question: "Which protocol is used for web browsing?",
    options: ["FTP", "HTTP", "SMTP", "SNMP"],
    answer: "HTTP",
  },
  {
    question: "Which layer handles routing?",
    options: [
      "Transport Layer",
      "Network Layer",
      "Session Layer",
      "Application Layer",
    ],
    answer: "Network Layer",
  },
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected: string) => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {

  const saveScore = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        totalScore: increment(score),
        totalAttempts: increment(1),
      });
    }
  };

  saveScore();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz Completed 🎉</Text>
      <Text style={styles.score}>
        Your Score: {score} / {questions.length}
      </Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  score: {
    fontSize: 22,
    marginTop: 20,
  },
});