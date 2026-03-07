import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SubmitAssignmentScreen({ route }: any){

  const { assignment } = route.params;

  const [answer,setAnswer] = useState("");

  const submitAssignment = async ()=>{

    const user = auth.currentUser;

    await addDoc(collection(db,"submissions"),{

      assignmentId: assignment.id,
      userId: user?.uid,
      answer,
      submittedAt:new Date()

    });

    alert("Assignment Submitted");

  };

  return(

    <View style={{padding:20}}>

      <Text style={{fontSize:20,fontWeight:"bold"}}>
        {assignment.title}
      </Text>

      <Text style={{marginVertical:10}}>
        {assignment.description}
      </Text>

      <TextInput
        placeholder="Write your answer"
        multiline
        style={{
          borderWidth:1,
          padding:10,
          marginBottom:20
        }}
        onChangeText={setAnswer}
      />

      <Button title="Submit Assignment" onPress={submitAssignment}/>

    </View>

  );

}