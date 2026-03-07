import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fetchAssignmentsByTopic } from "../services/assignmentService";

export default function AssignmentScreen({ route, navigation }: any){

  const topic = route?.params?.topic;

  const [assignments,setAssignments] = useState<any[]>([]);

  useEffect(()=>{

    const loadAssignments = async ()=>{
      const data = await fetchAssignmentsByTopic(topic);
      setAssignments(data);
    };

    loadAssignments();

  },[topic]);

  return(

    <View style={{flex:1,padding:20}}>

      <Text style={{fontSize:22,fontWeight:"bold",marginBottom:20}}>
        {topic} Assignments
      </Text>

      <FlatList
        data={assignments}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          
          <TouchableOpacity
            style={{
              padding:15,
              backgroundColor:"#eee",
              marginBottom:10,
              borderRadius:8
            }}
            onPress={()=>navigation.navigate("SubmitAssignment",{assignment:item})}
          >

            <Text style={{fontWeight:"bold"}}>
              {item.title}
            </Text>

            <Text>
              {item.description}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  );

}