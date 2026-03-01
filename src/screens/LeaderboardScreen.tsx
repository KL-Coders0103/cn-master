import { View, Text, FlatList } from "react-native";
import { db } from "../services/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function LeaderboardScreen() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      orderBy("totalScore", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(data);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        🏆 Leaderboard
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text>
              #{index + 1} - {item.email}
            </Text>
            <Text>Total Score: {item.totalScore || 0}</Text>
            <Text>Streak: {item.streak || 0}</Text>
          </View>
        )}
      />
    </View>
  );
}