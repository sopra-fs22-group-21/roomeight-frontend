import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../../screens/welcome';
import Signup from '../../screens/signup';
import Login from '../../screens/login';
import Profile from '../../screens/Profile';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/loginUser';

const Stack = createStackNavigator();

export default function Route() {
    /* const linking = {
        prefixes: ['https://www.roomeight.ch', 'https://roomeight.ch'],
        config: {
            screens: { }
        }
    }; 
    
*/
    const { loading, userProfile, error } = useSelector(
        (state) => state.userprofileState
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("dispatch")
        dispatch(userAuthStateListener());
    }, []);

    if (loading) {
        console.log('loading');
        return <View> loading </View>;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {Object.keys(userProfile).length === 0 ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Profile"
                            component={Profile}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
