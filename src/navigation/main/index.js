import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M8Loader from '../../../assets/logo/M8Loader';
import { userAuthStateListener } from '../../redux/actions/authActions';
import Chat from '../../screens/chat';
import AddPictures from '../../screens/create-profile/addPictures';
import AddProfilePicture from '../../screens/create-profile/addProfilePicture';
import ChooseStatus from '../../screens/create-profile/chooseStatus';
import CompleteFlatProfile from '../../screens/create-profile/completeFlatProfile';
import CompleteSingleProfile from '../../screens/create-profile/completeSingleProfile';
import Discover from '../../screens/discover';
import Matches from '../../screens/matches';
import Profile from '../../screens/profile';
import Login from '../../screens/welcome-login-signup/login';
import Signup from '../../screens/welcome-login-signup/signup';
import Welcome from '../../screens/welcome-login-signup/welcome';

const Stack = createStackNavigator();

export default function Route() {
    /* const linking = {
        prefixes: ['https://www.roomeight.ch', 'https://roomeight.ch'],
        config: {
            screens: { }
        }
    }; 
    
*/
    const { loading, userProfile, loggedIn, isComplete, error } = useSelector(
        (state) => state.userprofileState
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('dispatch');
        dispatch(userAuthStateListener());
    }, []);

    if (loading) {
        return <M8Loader height={200} width={200} />;
    }
    console.log('logged in: ' + loggedIn);
    console.log('user profile: ' + userProfile);
    console.log('complete: ' + isComplete);

    const loggedOutComponents = (
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
    );
    const incompleteComponents = (
        <>
            <Stack.Screen
                name="addProfilePicture"
                component={AddProfilePicture}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChooseStatus"
                component={ChooseStatus}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddPictures"
                component={AddPictures}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CompleteSingleProfile"
                component={CompleteSingleProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CompleteFlatProfile"
                component={CompleteFlatProfile}
                options={{ headerShown: false }}
            />
        </>
    );

    const completeComponents = (
        <>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
                name="Discover"
                component={Discover}
                options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
                name="Matches"
                component={Matches}
                options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false, animationEnabled: false }}
            />
        </>
    );

    function getUserStatus() {
        if (loggedIn) {
            if (isComplete) {
                return completeComponents;
            }
            return incompleteComponents;
        }
        return loggedOutComponents;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ cardStyle: { backgroundColor: 'white' } }}
            >
                {getUserStatus()}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
