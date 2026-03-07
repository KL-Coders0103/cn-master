import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddNoteScreen(){

  const [topic,setTopic] = useState("");
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const addNote = async () => {

    await addDoc(collection(db,"notes"),{

      topic,
      title,
      content,
      createdAt:new Date()

    });

    alert("Note Added");

  };

  return(

    <View style={{padding:20}}>

      <TextInput
        placeholder="Topic"
        onChangeText={setTopic}
      />

      <TextInput
        placeholder="Title"
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Content"
        multiline
        onChangeText={setContent}
      />

      <Button title="Add Note" onPress={addNote}/>

    </View>

  );

}