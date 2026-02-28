import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { useAuth } from "../context/AuthContext";
import NotesScreen from "../screens/NotesScreen";
import QuizScreen from "../screens/QuizScreen";

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