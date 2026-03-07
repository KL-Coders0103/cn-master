import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fetchNotesByTopic } from "../services/noteService";

export default function NotesScreen({ route }: any) {

  const topic  = route?.params?.topic;

  if(!topic) {
    return(
      <View style={{flex:1, justifyContent:"center", alignContent: "center"}}>
        <Text>No Topic Selected</Text>
      </View>
    );
  }

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {

    const loadNotes = async () => {
      const data = await fetchNotesByTopic(topic);
      setNotes(data);
    };

    loadNotes();

  }, [topic]);

  return (

    <View style={{ flex:1, padding:20 }}>

      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>
        {topic} Notes
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) => (

          <TouchableOpacity
            style={{
              padding:15,
              backgroundColor:"#eee",
              marginBottom:10,
              borderRadius:8
            }}
          >

            <Text style={{fontWeight:"bold"}}>
              {item.title}
            </Text>

            <Text numberOfLines={2}>
              {item.content}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  );

}