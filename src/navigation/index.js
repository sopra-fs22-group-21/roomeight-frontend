import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../redux/actions/authActions';
import addedToFlatScreens from './addedToFlatScreens';
import homeScreens from './homeScreens';
import incompleteScreens from './incompleteScreens';
import loadingScreens from './loadingScreens';
import loggedOutScreens from './loggedOutScreens';

export default function Route() {
    const Stack = createStackNavigator();

    const { loggedIn, loading } = useSelector((state) => state.authState);
    const { enterAppLoading } = useSelector((state) => state.userState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
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
        dispatch(userAuthStateListener());
    }, []);

    useEffect(() => {
        //user is logged out
        if (!loggedIn && !loading)
            setCurrentComponents(createScreens(loggedOutScreens));
        //userprofile is loading, waiting to enter app
        else if (enterAppLoading)
            setCurrentComponents(createScreens(loadingScreens));
        //if the userprofile is complete, the user is allowed to enter the main app
        else if (userprofile.isComplete)
            setCurrentComponents(createScreens(homeScreens));
        //if the userprofile is not complete
        else if (userprofile.isComplete === false) {
            //status can be chosen if the user doesn't belong to a flat yet
            if (userprofile.flatId == '')
                setCurrentComponents(createScreens(incompleteScreens));
            else setCurrentComponents(createScreens(addedToFlatScreens));
        }
    }, [userprofile, flatprofile, loggedIn, enterAppLoading, loading]);

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
