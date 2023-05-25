import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ListScreen from "./pages/ListScreen";
import { RootStackParamList } from "./domain/models/pages";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela de Pesquisa" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Lista" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;