import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { fetchTopics } from "../services/topicService";

export default function SelectTopicScreen({ navigation }: any) {

  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {

    const loadTopics = async () => {
      const data = await fetchTopics();
      setTopics(data);
    };

    loadTopics();

  }, []);

  return (

    <View style={{ flex:1, padding:20 }}>

      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>
        Select Topic
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
            onPress={() =>
              navigation.navigate("Quiz", { topic: item })
            }
          >
            <Text style={{ color:"#fff" }}>{item}</Text>
          </TouchableOpacity>

        )}
      />

    </View>

  );

}