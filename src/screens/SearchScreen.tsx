import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { globalSearch } from "../services/searchService";

export default function SearchScreen({navigation}:any){

  const [query,setQuery] = useState("");
  const [results,setResults] = useState<any[]>([]);

  const handleSearch = async (text:string)=>{

    setQuery(text);

    if(text.length < 2){
      setResults([]);
      return;
    }

    const data = await globalSearch(text);

    setResults(data);

  };

  return(

    <View style={{flex:1,padding:20}}>

      <TextInput
        placeholder="Search topics, notes..."
        style={{
          borderWidth:1,
          padding:10,
          marginBottom:20
        }}
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={results}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(

          <TouchableOpacity
            style={{
              padding:15,
              backgroundColor:"#eee",
              marginBottom:10,
              borderRadius:8
            }}
          >

            <Text style={{fontWeight:"bold"}}>
              {item.title || item.question}
            </Text>

            <Text>
              {item.type}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  );

}