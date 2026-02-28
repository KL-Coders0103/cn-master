import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
  const [userData, setUserData] = useState<any>(null);
  const navigation : any = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;

    if(!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsubcribe = onSnapshot(userRef, (docSnap) => {
      if(docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });

    return unsubcribe;
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
        </>
      )}

      <Button title="Go to Notes" onPress={() => navigation.navigate("Notes")} />
      <Button title="Start Quiz" onPress={() => navigation.navigate("Quiz")} />

      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}