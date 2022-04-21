import { React, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { SingleDetailCard } from '../../../components/singleDetailCard';
import { LikeButton, LikeButtons } from '../../../components/likeButtons';
import { SharedElement } from 'react-navigation-shared-element';
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

const DiscoverDetail = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    return (
        <Screen navigation={navigation} showFooter>
            <Container style={styles.container}>
                <SmallHeading>Discover</SmallHeading>
                <Box />

                <SingleDetailCard
                    onPress={() => navigation.navigate('DiscoverImage')}
                />

                <Box />
                <SharedElement id={'likeButtons'}>
                    <LikeButtons />
                </SharedElement>
            </Container>
        </Screen>
    );
};

export default DiscoverDetail;
