import { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { Container, Screen } from '../../components/theme';
import { logoutUser } from '../../redux/actions/authActions';
import { getUserProfiles } from '../../redux/actions/getUserprofiles';

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
