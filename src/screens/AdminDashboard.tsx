import { View, Text, TouchableOpacity } from "react-native";

export default function AdminDashboard({ navigation }: any) {

  return (

    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

      <Text style={{fontSize:22,fontWeight:"bold"}}>
        Admin Panel
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddQuestion")}
        style={{marginTop:20,padding:15,backgroundColor:"#2563eb"}}
      >
        <Text style={{color:"#fff"}}>Add Question</Text>
      </TouchableOpacity>

      <TouchableOpacity
  onPress={() => navigation.navigate("AdminQuestions")}
  style={{
    marginTop: 20,
    padding: 15,
    backgroundColor: "#16a34a",
  }}
>
  <Text style={{ color: "#fff" }}>
    Manage Questions
  </Text>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => navigation.navigate("AddNote")}
  style={{
    marginTop:20,
    padding:15,
    backgroundColor:"#2563eb"
  }}
>
  <Text style={{color:"#fff"}}>Add Notes</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => navigation.navigate("AddResource")}
  style={{
    marginTop:20,
    padding:15,
    backgroundColor:"#2563eb"
  }}
>
  <Text style={{color:"#fff"}}>Add Resource</Text>
</TouchableOpacity>

    </View>

  );

}