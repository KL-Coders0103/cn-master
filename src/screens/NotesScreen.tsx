import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function NotesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>OSI Model</Text>
      <Text style={styles.content}>
        The OSI Model has 7 layers:
        {"\n\n"}
        1. Physical Layer{"\n"}
        2. Data Link Layer{"\n"}
        3. Network Layer{"\n"}
        4. Transport Layer{"\n"}
        5. Session Layer{"\n"}
        6. Presentation Layer{"\n"}
        7. Application Layer
      </Text>

      <Text style={styles.heading}>TCP/IP Model</Text>
      <Text style={styles.content}>
        TCP/IP has 4 layers:
        {"\n\n"}
        1. Network Access{"\n"}
        2. Internet{"\n"}
        3. Transport{"\n"}
        4. Application
      </Text>

      <Text style={styles.heading}>Routing</Text>
      <Text style={styles.content}>
        Routing determines the best path for data packets.
        Examples:
        {"\n"}• Static Routing
        {"\n"}• Dynamic Routing
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});