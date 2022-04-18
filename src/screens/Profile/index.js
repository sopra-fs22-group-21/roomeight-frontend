import { useEffect, useState } from 'react';
import { Text, Button, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getUserProfiles } from '../../redux/actions/getUserprofiles';
import { PrimaryButton } from '../../components/button';
import styles from './style';
import { logoutUser } from '../../redux/actions/logoutUser';
import { Container, Screen } from '../../components/theme';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { loading, userProfile, loggedIn, isComplete, error } = useSelector(
        (state) => state.userprofileState
    );

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userProfile);
    }
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Text>UserId</Text>
                <Text>{!loading && userProfile.userId}</Text>
                <PrimaryButton
                    onPress={() => {
                        dispatch(logoutUser());
                    }}
                >
                    Logout
                </PrimaryButton>
                <PrimaryButton
                    onPress={() => {
                        dispatch(getUserProfiles());
                    }}
                >
                    get
                </PrimaryButton>
            </Container>
        </Screen>
    );
};

export default Profile;
