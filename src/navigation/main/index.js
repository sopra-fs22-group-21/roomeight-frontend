import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/authActions';
import loggedOutScreens from '../loggedOutScreens';
import loadingScreens from '../loadingScreens';
import incompleteScreens, { createFlatScreens } from '../incompleteScreens';
import homeScreens from '../homeScreens';
import { chatMemberShipListener } from '../../redux/actions/chatActions';

export default function Route() {
    const Stack = createStackNavigator();

    const { auth, loggedIn } = useSelector((state) => state.authState);
    const loading = useSelector((state) => state.loadingState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { profileCompletionStatus } = useSelector(
        (state) => state.transitState
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('navigation dispatch');
        dispatch(userAuthStateListener());
    }, []);

    const createScreens = (screens) => {
        return (
            <>
                {screens.map((screen, index) => (
                    <Stack.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ))}
            </>
        );
    };

    const getUserStatus = () => {
        if (!loggedIn) return createScreens(loggedOutScreens);
        if (!userprofile) return createScreens(loadingScreens);
        if (!userprofile.isComplete) return createScreens(incompleteScreens);
        if (userprofile.flatId != '') return createScreens(homeScreens);
        if (userprofile)
            return createScreens(homeScreens.concat(createFlatScreens));
    };

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
