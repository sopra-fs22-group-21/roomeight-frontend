import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/authActions';
import loggedOutScreens from '../loggedOutScreens';
import loadingScreens from '../loadingScreens';
import incompleteScreens, {
    createFlatScreens,
    chooseStatus,
} from '../incompleteScreens';
import homeScreens from '../homeScreens';
import { chatMemberShipListener } from '../../redux/actions/chatActions';

export default function Route() {
    const Stack = createStackNavigator();

    const { auth, loggedIn } = useSelector((state) => state.authState);
    const { loading } = useSelector((state) => state.loadingState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { profileCompletionStatus } = useSelector(
        (state) => state.transitState
    );
    const dispatch = useDispatch();
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

    const [currentComponents, setCurrentComponents] = useState(
        createScreens(loadingScreens)
    );
    useEffect(() => {
        console.log('navigation dispatch');
        dispatch(userAuthStateListener());
    }, []);

    useEffect(() => {
        console.log(loading);
        if (!loggedIn) setCurrentComponents(createScreens(loggedOutScreens));
        else if (Object.keys(userprofile).length === 0)
            setCurrentComponents(createScreens(loadingScreens));
        else if (
            userprofile.isComplete === false &&
            userprofile.flatId.length < 1
        )
            setCurrentComponents(
                createScreens(chooseStatus.concat(incompleteScreens))
            );
        else if (
            userprofile.isComplete === false &&
            userprofile.flatId.length > 0
        )
            setCurrentComponents(createScreens(incompleteScreens));
        else if (
            userprofile.isComplete &&
            userprofile.flatId &&
            userprofile.flatId != ''
        )
            setCurrentComponents(createScreens(homeScreens));
        else if (Object.keys(userprofile).length > 0)
            setCurrentComponents(
                createScreens(homeScreens.concat(createFlatScreens))
            );
    }, [userprofile, loggedIn, loading]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ cardStyle: { backgroundColor: 'white' } }}
            >
                {currentComponents}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
