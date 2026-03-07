import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useState, useEffect } from "react";
import { addPlan, fetchTodayPlan } from "../services/plannerService";

export default function PlannerScreen(){

  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState<string[]>([]);
  const [plan,setPlan] = useState<any[]>([]);

  const addTask = ()=>{
    if(task.trim().length === 0) return;

    setTasks([...tasks,task]);
    setTask("");
  };

  const savePlan = async ()=>{
    await addPlan(tasks);
    alert("Plan Saved");
    loadPlan();
  };

  const loadPlan = async ()=>{
    const data = await fetchTodayPlan();
    setPlan(data);
  };

  useEffect(()=>{
    loadPlan();
  },[]);

  return(

    <View style={{flex:1,padding:20}}>

      <Text style={{fontSize:22,fontWeight:"bold",marginBottom:20}}>
        Study Planner
      </Text>

      <TextInput
        placeholder="Add Task"
        value={task}
        onChangeText={setTask}
        style={{
          borderWidth:1,
          padding:10,
          marginBottom:10
        }}
      />

      <Button title="Add Task" onPress={addTask}/>

      <FlatList
        data={tasks}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item})=>(
          <Text style={{marginTop:5}}>
            • {item}
          </Text>
        )}
      />

      <Button
        title="Save Plan"
        onPress={savePlan}
      />

      <Text style={{marginTop:30,fontWeight:"bold"}}>
        Today's Plan
      </Text>

      <FlatList
        data={plan}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(

          <View style={{marginTop:10}}>
            {item.tasks.map((t:string,i:number)=>(
              <Text key={i}>
                ✓ {t}
              </Text>
            ))}
          </View>

        )}
      />

    </View>

  );

}