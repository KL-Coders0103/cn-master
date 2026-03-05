import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddQuestionScreen() {

  const [question,setQuestion] = useState("");
  const [option1,setOption1] = useState("");
  const [option2,setOption2] = useState("");
  const [option3,setOption3] = useState("");
  const [option4,setOption4] = useState("");
  const [answer,setAnswer] = useState("");
  const [topic,setTopic] = useState("");

  const addQuestion = async () => {
  try {

    if (!topic || !question || !option1 || !option2 || !option3 || !option4 || !answer) {
      alert("Fill all fields");
      return;
    }

    const docRef = await addDoc(collection(db, "questions"), {
      topic: topic,
      question: question,
      options: [option1, option2, option3, option4],
      answer: answer,
      createdAt: new Date()
    });

    console.log("Question added with ID:", docRef.id);

    alert("Question Added Successfully");

  } catch (error) {

    console.log("Error adding question:", error);

    alert("Error adding question");

  }
};

  return(

    <View style={{padding:20}}>

      <TextInput placeholder="Topic" onChangeText={setTopic} />

      <TextInput placeholder="Question" onChangeText={setQuestion} />

      <TextInput placeholder="Option 1" onChangeText={setOption1} />
      <TextInput placeholder="Option 2" onChangeText={setOption2} />
      <TextInput placeholder="Option 3" onChangeText={setOption3} />
      <TextInput placeholder="Option 4" onChangeText={setOption4} />

      <TextInput placeholder="Correct Answer" onChangeText={setAnswer} />

      <Button title="Add Question" onPress={addQuestion}/>

    </View>

  );

}