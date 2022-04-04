import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../../screens/welcome";
import Signup from "../../screens/signup";
import Login from "../../screens/login";

const Stack = createStackNavigator();

export default function Route() {
  /* const linking = {
        prefixes: ['https://www.roomeight.ch', 'https://roomeight.ch'],
        config: {
            screens: { }
        }
    }; 
    
*/

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
