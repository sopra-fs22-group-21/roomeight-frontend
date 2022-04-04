import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../../screens/signup';
import Profiles from '../../screens/Profiles';

const Stack = createStackNavigator();

export default function Route() {
    /* const linking = {
        prefixes: ['https://www.roomeight.ch', 'https://roomeight.ch'],
        config: {
            screens: { }
        }
    }; */

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Profiles" component={Profiles} />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
