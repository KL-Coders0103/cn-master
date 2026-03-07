import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { useAuth } from "../context/AuthContext";
import NotesScreen from "../screens/NotesScreen";
import QuizScreen from "../screens/QuizScreen";
import HistoryScreen from "../screens/HistoryScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import SelectTopicScreen from "../screens/SelectTopicScreen";
import AdminDashboard from "../screens/AdminDashboard";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import AdminQuestionsScreen from "../screens/AdminQuestionsScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import ResourceScreen from "../screens/ResourceScreen";
import AddResourceScreen from "../screens/AddResourceScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const { user, loading } = useAuth();

    if(loading) return null;

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Notes" component={NotesScreen} />
                        <Stack.Screen name="Quiz" component={QuizScreen} />
                        <Stack.Screen name="History" component={HistoryScreen} />
                        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
                        <Stack.Screen name="SelectTopic" component={SelectTopicScreen} />
                        <Stack.Screen name="Admin" component={AdminDashboard}/>
<Stack.Screen name="AddQuestion" component={AddQuestionScreen}/>
<Stack.Screen
  name="AdminQuestions"
  component={AdminQuestionsScreen}
/>
<Stack.Screen name="AddNote" component={AddNoteScreen} />
<Stack.Screen name="Resources" component={ResourceScreen} />
<Stack.Screen name="AddResource" component={AddResourceScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
     
            </Stack.Navigator>
        </NavigationContainer>
    );
}