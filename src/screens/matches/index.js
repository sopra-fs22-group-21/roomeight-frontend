import React from 'react';
import { Text } from 'react-native';
import { ImageCard } from '../../components/imageCard';
import { LikeButton } from '../../components/likeButtons';
import { Box, Container, Screen, SmallHeading } from '../../components/theme';

const Matches = ({ navigation }) => {
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <SmallHeading>Matches</SmallHeading>
                <Box />
            </Container>
        </Screen>
    );
};
export default Matches;
