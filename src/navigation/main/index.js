import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { goOffline, goOnline } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../../firebase/firebase-config';
import { userAuthStateListener } from '../../redux/actions/authActions';
import homeScreens from '../homeScreens';
import incompleteScreens, {
    addRoomieScreens,
    chooseStatus,
    createFlatScreens,
} from '../incompleteScreens';
import loadingScreens from '../loadingScreens';
import { handleAppStateChange } from '../../helper/notificationsHelper';
import loggedOutScreens from '../loggedOutScreens';

export default function Route() {
    const Stack = createStackNavigator();
    const CurrentComponents = createStackNavigator();
    const { loggedIn } = useSelector((state) => state.authState);
    const { loading } = useSelector((state) => state.loadingState);
    const { flatId, isComplete } = useSelector(
        (state) => state.userprofileState?.userprofile
    );
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const lastNotificationResponse =
        Notifications.useLastNotificationResponse();
    const [currentComponents, setCurrentComponents] = useState(loadingScreens);

    useEffect(() => {
        console.log('navigation dispatch');
        dispatch(userAuthStateListener());
    }, []);

    useEffect(() => {
        const _listener = AppState.addEventListener(
            'change',
            handleAppStateChange
        );
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    });

    useEffect(() => {
        navigation.navigate('CurrentComponents', { screen: 'Matches' });
    }, [lastNotificationResponse]);

    function CurrentComponentsBuilder() {
        return createScreens(currentComponents);
    }

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

    useEffect(() => {
        console.log('loading:', loading);
        console.log('loggedIn:', loggedIn);
        if (!loggedIn && !loading) setCurrentComponents(loggedOutScreens);
        else if (isComplete === false && flatId.length < 1)
            setCurrentComponents(chooseStatus.concat(incompleteScreens));
        else if (isComplete === false && flatId.length > 0)
            setCurrentComponents(incompleteScreens);
        else if (isComplete && flatId && flatId != '')
            setCurrentComponents(homeScreens.concat(addRoomieScreens));
        else {
            setCurrentComponents(homeScreens.concat(createFlatScreens));
        }
    }, [isComplete, flatId, loggedIn, loading]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CurrentComponents"
                component={CurrentComponentsBuilder}
            />
        </Stack.Navigator>
    );
}
