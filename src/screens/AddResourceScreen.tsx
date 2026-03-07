import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddResourceScreen(){

  const [topic,setTopic] = useState("");
  const [title,setTitle] = useState("");
  const [type,setType] = useState("");
  const [url,setUrl] = useState("");

  const addResource = async () => {

    await addDoc(collection(db,"resources"),{

      topic,
      title,
      type,
      url,
      createdAt:new Date()

    });

    alert("Resource Added");

  };

  return(

    <View style={{padding:20}}>

      <TextInput placeholder="Topic" onChangeText={setTopic} />

      <TextInput placeholder="Title" onChangeText={setTitle} />

      <TextInput placeholder="Type (video/pdf/link)" onChangeText={setType} />

      <TextInput placeholder="URL" onChangeText={setUrl} />

      <Button title="Add Resource" onPress={addResource}/>

    </View>

  );

}