import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { fetchQuizTopics, fetchNotesTopics } from "../services/topicService";

export default function SelectTopicScreen({ navigation, route }: any) {

  const mode = route?.params?.mode || "quiz";

  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {

  const loadTopics = async () => {

    if(mode === "notes"){
      const data = await fetchNotesTopics();
      setTopics(data);
    }else{
      const data = await fetchQuizTopics();
      setTopics(data);
    }

  };

  loadTopics();

}, [mode]);

  return (

    <View style={{ flex:1, padding:20 }}>

      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>
  {mode === "notes" ? "Select Topic for Notes" : "Select Topic for Quiz"}
</Text>

      <FlatList
        data={topics}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={{
              padding:15,
              backgroundColor:"#2563eb",
              marginBottom:10,
              borderRadius:8
            }}
            onPress={() => {
  if(mode === "notes"){
    navigation.navigate("Notes", { topic: item });
  } else {
    navigation.navigate("Quiz", { topic: item });
  }
}}
          >
            <Text style={{ color:"#fff" }}>{item}</Text>
          </TouchableOpacity>

        )}
      />

    </View>

  );

}