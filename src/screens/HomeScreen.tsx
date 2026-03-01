import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [average, setAverage] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const navigation : any = useNavigation();

useEffect(() => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userRef = doc(db, "users", currentUser.uid);

  const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
  });

  const historyRef = collection(
    db,
    "users",
    currentUser.uid,
    "quizHistory"
  );

  const unsubscribeHistory = onSnapshot(historyRef, (snapshot) => {
    if (snapshot.empty) {
      setAverage(0);
      setBestScore(0);
      return;
    }

    let total = 0;
    let best = 0;

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      total += data.percentage;

      if (data.percentage > best) {
        best = data.percentage;
      }
    });

    setAverage(total / snapshot.docs.length);
    setBestScore(best);
  });

  return () => {
    unsubscribeUser();
    unsubscribeHistory();
  };
}, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to CN Master 🚀</Text>

      {userData && (
        <>
          <Text>Email: {userData.email}</Text>
          <Text>Role: {userData.role}</Text>
          <Text>Streak: {userData.streak}</Text>
          <Text>Total Score: {userData.totalScore}</Text>
          <Text>Total Attempts: {userData.totalAttempts}</Text>
          <Text>Average Score: {average.toFixed(1)}%</Text>
          <Text>Best Score: {bestScore}%</Text>
        </>
      )}

      <Button title="Go to Notes" onPress={() => navigation.navigate("Notes")} />
      <Button title="Start Quiz" onPress={() => navigation.navigate("Quiz")} />
      <Button title="View History" onPress={() => navigation.navigate("History")} />
      <Button title="View Leaderboard"
      onPress={() => navigation.navigate("Leaderboard")}/>

      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}