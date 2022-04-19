import { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { Container, Screen } from '../../components/theme';
import { logoutUser } from '../../redux/actions/authActions';
import { getCurrentUserprofile } from '../../redux/actions/getUserprofiles';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userprofile);
    }
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Text>
                    {userprofile.firstName + ' ' + userprofile.lastName}
                </Text>
                <PrimaryButton
                    onPress={() => {
                        dispatch(logoutUser());
                    }}
                >
                    Logout
                </PrimaryButton>
                <PrimaryButton
                    onPress={() => {
                        dispatch(getCurrentUserprofile(auth.uid));
                    }}
                >
                    get
                </PrimaryButton>
            </Container>
        </Screen>
    );
};

export default Profile;
