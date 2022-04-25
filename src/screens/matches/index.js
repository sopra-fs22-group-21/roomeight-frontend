import React from 'react';
import { Text } from 'react-native';
import { ImageCard } from '../../components/imageCard';
import { LikeButton } from '../../components/likeButtons';
import { Box, Container, Screen, SmallHeading } from '../../components/theme';

const Matches = ({ navigation }) => {
    return (
        <Container navigation={navigation} showLogout showNavBar>
            <SmallHeading>Matches</SmallHeading>
            <Box />
        </Container>
    );
};
export default Matches;
