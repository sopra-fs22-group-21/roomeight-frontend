import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/authActions';
import homeScreens from '../homeScreens';
import incompleteScreens, {
    chooseStatus,
    createFlatScreens,
    addRoomieScreens,
    addedScreens,
} from '../incompleteScreens';
import loadingScreens from '../loadingScreens';
import loggedOutScreens from '../loggedOutScreens';

export default function Route() {
    const Stack = createStackNavigator();

    const { loggedIn } = useSelector((state) => state.authState);
    const { loading } = useSelector((state) => state.loadingState);
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
        console.log('navigation dispatch');
        dispatch(userAuthStateListener());
    }, []);

    useEffect(() => {
        console.log('pictures:', flatprofile.pictureReferences);
        console.log('userprofile.isComplete ', userprofile.isComplete);
        console.log('userprofile.flatId ', userprofile.flatId);
        console.log('!flatprofile.pictureReferences: ', !flatprofile.pictureReferences );
        
        if (!loggedIn && !loading)
            setCurrentComponents(createScreens(loggedOutScreens));
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
            userprofile.flatId.length > 0 &&
            (!flatprofile.pictureReferences ||
            flatprofile.pictureReferences.length <= 0)
        )
            setCurrentComponents(createScreens(incompleteScreens));
        else if (
            userprofile.isComplete === false &&
            userprofile.flatId.length > 0 &&
            flatprofile.pictureReferences &&
            flatprofile.pictureReferences.length > 0
        )
            setCurrentComponents(createScreens(addedScreens));
        else if (
            userprofile.isComplete &&
            userprofile.flatId &&
            userprofile.flatId != ''
        )
            setCurrentComponents(
                createScreens(homeScreens.concat(addRoomieScreens))
            );
        else if (Object.keys(userprofile).length > 0 && userprofile.isComplete)
            setCurrentComponents(
                createScreens(homeScreens.concat(createFlatScreens))
            );
        else 
            setCurrentComponents(createScreens(loadingScreens));
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
