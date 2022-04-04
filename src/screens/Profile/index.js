import { useEffect, useState } from 'react';
import { Text, Button, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getUserProfiles } from '../../redux/actions/getUserprofiles';

const Profile = () => {
    useEffect(() => {
        dispatch(getUserProfiles());
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
        <View>
            <Text>UserId</Text>
            <Text>{!loading && userProfile.userId}</Text>
        </View>
    );
};

export default Profile;
