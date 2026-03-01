import { View, Text, TouchableOpacity } from "react-native";

export default function SelectTopicScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Select Topic
      </Text>

      <TouchableOpacity
        style={{ padding: 15, backgroundColor: "#2563eb", marginBottom: 10 }}
        onPress={() => navigation.navigate("Quiz", { topic: "OSI" })}
      >
        <Text style={{ color: "#fff" }}>OSI Model</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 15, backgroundColor: "#2563eb" }}
        onPress={() => navigation.navigate("Quiz", { topic: "TCPIP" })}
      >
        <Text style={{ color: "#fff" }}>TCP/IP</Text>
      </TouchableOpacity>
    </View>
  );
}