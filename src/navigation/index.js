import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleAppStateChange } from '../helper/notificationsHelper';
import { userAuthStateListener } from '../redux/actions/authActions';
import { connectionChanges } from '../redux/actions/chatActions';
import { NEW_MATCH, NEW_MATCH_IN_PROGRESS } from '../redux/constants';
import addedToFlatScreens from './addedToFlatScreens';
import homeScreens from './homeScreens';
import incompleteScreens from './incompleteScreens';
import loadingScreens from './loadingScreens';
import loggedOutScreens from './loggedOutScreens';

export default function Route() {
    const Stack = createStackNavigator();
    const CurrentComponents = createStackNavigator();
    const { loggedIn, loading } = useSelector((state) => state.authState);
    const { enterAppLoading } = useSelector((state) => state.userState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const navigation = useNavigation();
    const lastNotificationResponse =
        Notifications.useLastNotificationResponse();
    const dispatch = useDispatch();
    const [currentComponents, setCurrentComponents] = useState(loadingScreens);

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, []);

    useEffect(() => {
        if (lastNotificationResponse) {
            const { data } =
                lastNotificationResponse.notification.request.content;
            if (data.type == NEW_MATCH)
                navigation.navigate('CurrentComponents', { screen: 'Matches' });
            if (data.type == NEW_MATCH_IN_PROGRESS)
                navigation.navigate('CurrentComponents', {
                    screen: 'Matches',
                    params: { showMatchesInProgress: true },
                });
        }
    }, [lastNotificationResponse]);

    useEffect(() => {
        const _listener = AppState.addEventListener('change', (state) => {
            if (state === 'active') dispatch(connectionChanges('online'));
            else if (state === 'background')
                dispatch(connectionChanges('offline'));
        });
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    });

    useEffect(() => {
        //user is logged out
        if (!loggedIn) setCurrentComponents(loggedOutScreens);
        //userprofile is loading, waiting to enter app
        else if (enterAppLoading) setCurrentComponents(loadingScreens);
        //if the userprofile is complete, the user is allowed to enter the main app
        else if (userprofile.isComplete) setCurrentComponents(homeScreens);
        //if the userprofile is not complete
        else if (userprofile.isComplete === false) {
            //status can be chosen if the user doesn't belong to a flat yet
            if (userprofile.flatId === '')
                setCurrentComponents(incompleteScreens);
            else setCurrentComponents(addedToFlatScreens);
        }
    }, [userprofile, flatprofile, loggedIn, enterAppLoading]);

    const createScreens = (screens) => {
        return (
            <CurrentComponents.Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: 'white' },
                    headerShown: false,
                }}
            >
                {screens.map((screen, index) => (
                    <CurrentComponents.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ))}
            </CurrentComponents.Navigator>
        );
    };

    function CurrentComponentsBuilder() {
        return createScreens(currentComponents);
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CurrentComponents"
                component={CurrentComponentsBuilder}
            />
        </Stack.Navigator>
    );
}
