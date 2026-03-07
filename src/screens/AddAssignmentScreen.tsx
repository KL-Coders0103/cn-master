import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddAssignmentScreen(){

  const [topic,setTopic] = useState("");
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const addAssignment = async ()=>{

    await addDoc(collection(db,"assignments"),{

      topic,
      title,
      description,
      createdAt:new Date()

    });

    alert("Assignment Added");

  };

  return(

    <View style={{padding:20}}>

      <TextInput placeholder="Topic" onChangeText={setTopic} />

      <TextInput placeholder="Title" onChangeText={setTitle} />

      <TextInput
        placeholder="Description"
        multiline
        onChangeText={setDescription}
      />

      <Button title="Add Assignment" onPress={addAssignment}/>

    </View>

  );

}