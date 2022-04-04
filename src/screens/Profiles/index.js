import { useEffect, useState } from 'react';
import { Text, Button, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getUserProfiles } from '../../redux/actions/userProfiles';

const Profiles = () => {
    useEffect(() => {
        dispatch(getUserProfiles());
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { loading, userProfiles, error } = useSelector(
        (state) => state.userProfilesReducer
    );

    if (!loading) {
        console.log(loading);
        console.log(userProfiles);
    }
    return (
        <View>
            <Text>Name</Text>
            <Text>{!loading && userProfiles[0].EmailAddress}</Text>
        </View>
    );
};

export default Profiles;
//export default connect(mapStateToProps, { getUserProfiles })(Profiles);
