import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ProfilePicture } from '../../components/profilePicture';
import { Container, Heading, Screen } from '../../components/theme';

const Discover = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    console.log("Jordi: "+JSON.stringify(userprofile))
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Heading>Discover</Heading>
                <ProfilePicture image={(userprofile.pictureReference.length>0) ? userprofile.pictureReference[0] : null} />
            </Container>
        </Screen>
    );
};
export default Discover;
