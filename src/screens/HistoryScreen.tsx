import { View, Text, FlatList } from "react-native";
import { auth, db } from "../services/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const historyRef = collection(
      db,
      "users",
      currentUser.uid,
      "quizHistory"
    );

    const unsubscribe = onSnapshot(historyRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(data);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Quiz History
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text>Score: {item.score}</Text>
            <Text>Percentage: {item.percentage}%</Text>
          </View>
        )}
      />
    </View>
  );
}