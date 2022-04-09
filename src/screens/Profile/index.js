import { useEffect, useState } from 'react';
import { Text, Button, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getUserProfiles } from '../../redux/actions/getUserprofiles';
import { PrimaryButton } from '../../components/button';
import styles from './style';
import { logoutUser } from '../../redux/actions/logoutUser';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { loading, userProfile, error } = useSelector(
        (state) => state.userprofileState
    );

    if (!loading) {
        console.log(loading);
        console.log(userProfile);
    }
    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default Profile;
