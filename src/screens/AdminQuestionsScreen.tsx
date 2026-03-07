import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminQuestionsScreen() {

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "questions"),
      (snapshot) => {

        const data = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setQuestions(data);

      }
    );

    return unsubscribe;

  }, []);

  const deleteQuestion = async (id: string) => {

    Alert.alert(
      "Delete Question",
      "Are you sure?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteDoc(doc(db, "questions", id));
          },
        },
      ]
    );

  };

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Manage Questions
      </Text>

      <FlatList
        data={questions}
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

            <Text style={{ fontWeight: "bold" }}>
              {item.topic}
            </Text>

            <Text style={{ marginTop: 5 }}>
              {item.question}
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "red",
                borderRadius: 6,
              }}
              onPress={() => deleteQuestion(item.id)}
            >
              <Text style={{ color: "#fff" }}>Delete</Text>
            </TouchableOpacity>

          </View>

        )}
      />

    </View>
  );
}