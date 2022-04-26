import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/authActions';
import {
    chatMemberShipListener,
    chatInfoListener,
} from '../../redux/actions/chatActions';
import Chat from '../../screens/chat';
import Chatroom from '../../screens/chatRoom';
import AddPictures from '../../screens/create-profile/addPictures';
import CompletePersonalProfile from '../../screens/create-profile/completePersonalProfile';
import ChooseStatus from '../../screens/create-profile/chooseStatus';
import RoomInfo from '../../screens/create-profile/roomInfo';
import CompleteSingleProfile from '../../screens/create-profile/completeSingleProfile';
import Discover from '../../screens/discover/discover';
import Matches from '../../screens/matches/matches';
import Match from '../../screens/matches/match';
import Profile from '../../screens/profile';
import Login from '../../screens/welcome-login-signup/login';
import Signup from '../../screens/welcome-login-signup/signup';
import Welcome from '../../screens/welcome-login-signup/welcome';
import SignupDetails from '../../screens/welcome-login-signup/signupDetails';
import genders from '../../resources/strings/genders';
import FlatInfo from '../../screens/create-profile/flatInfo';
import Done from '../../screens/create-profile/done';

export default function Route() {
    const Stack = createStackNavigator();
    /* const linking = {
        prefixes: ['https://www.roomeight.ch', 'https://roomeight.ch'],
        config: {
            screens: { }
        }
    }; 
    
*/
    const { auth, loggedIn } = useSelector((state) => state.authState);
    const loading = useSelector((state) => state.loadingState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { profileCompletionStatus } = useSelector(
        (state) => state.transitState
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('dispatch');
        dispatch(userAuthStateListener());
    }, []);

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
                name="SignupDetails"
                component={SignupDetails}
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
                name="ChooseStatus"
                component={ChooseStatus}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CompletePersonalProfile"
                component={CompletePersonalProfile}
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
                name="RoomInfo"
                component={RoomInfo}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlatInfo"
                component={FlatInfo}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Done"
                component={Done}
                options={{ headerShown: false }}
            />
        </>
    );
    const mainOptions = {
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator: ({ current: { progress } }) => {
            return {
                cardStyle: {
                    opacity: progress,
                },
            };
        },
    };
    const completeComponents = (
        <>
            <Stack.Screen
                name="Discover"
                component={Discover}
                options={mainOptions}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={mainOptions}
            />
            <Stack.Screen
                name="Matches"
                component={Matches}
                options={mainOptions}
            />
            <Stack.Screen
                name="Match"
                component={Match}
                options={mainOptions}
            />
            <Stack.Screen
                name="ChatRoom"
                component={Chatroom}
                options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen name="Chat" component={Chat} options={mainOptions} />
        </>
    );

    function getUserStatus() {
        if (loggedIn) {
            if (userprofile.images && userprofile.images.length > 0) {
                return completeComponents;
            } else return incompleteComponents;
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
