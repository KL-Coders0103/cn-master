import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import { useEffect, useState } from "react";
import { fetchResourcesByTopic } from "../services/resourceService";

export default function ResourceScreen({ route }: any) {

  const topic = route?.params?.topic;

  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {

    const loadResources = async () => {
      const data = await fetchResourcesByTopic(topic);
      setResources(data);
    };

    loadResources();

  }, [topic]);

  return (

    <View style={{ flex:1, padding:20 }}>

      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>
        {topic} Resources
      </Text>

      <FlatList
        data={resources}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) => (

          <TouchableOpacity
            style={{
              padding:15,
              backgroundColor:"#eee",
              marginBottom:10,
              borderRadius:8
            }}
            onPress={() => Linking.openURL(item.url)}
          >

            <Text style={{fontWeight:"bold"}}>
              {item.title}
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