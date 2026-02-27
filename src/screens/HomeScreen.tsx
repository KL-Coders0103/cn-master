import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function HomeScreen() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUser();
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
        </>
      )}

      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}