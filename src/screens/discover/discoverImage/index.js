import { React, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { SingleDetailCard } from '../../../components/singleDetailCard';
import { LikeButton, LikeButtons } from '../../../components/likeButtons';
import { ProfilePicture } from '../../../components/profilePicture';
import {
    Box,
    Container,
    Heading,
    Screen,
    SmallHeading,
} from '../../../components/theme';
import styles from './styles';
import { ImageCard } from '../../../components/imageCard';
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const DiscoverImage = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    return (
        <Screen navigation={navigation} showFooter>
            <Container style={styles.container}>
                <SmallHeading>Discover</SmallHeading>
                <Box />
                <SharedElement id="card" style={{ flex: 0.9 }}>
                    <ImageCard
                        onPress={() => navigation.navigate('DiscoverDetail')}
                    />
                </SharedElement>
                <Box />

                <SharedElement id={'likeButtons'}>
                    <LikeButtons />
                </SharedElement>
            </Container>
        </Screen>
    );
};

export default DiscoverImage;
