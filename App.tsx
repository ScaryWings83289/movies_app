//* Packages Imports */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//* Components Imports */
import Home from "@Screens/Home";
import Movie from "@Screens/Movie";
import Search from "@Screens/Search";

//* Create Stack Navigator */
const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="Movie"
        options={{ headerShown: false }}
        component={Movie}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

