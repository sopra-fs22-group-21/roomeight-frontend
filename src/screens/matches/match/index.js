import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ImageCard } from '../../../components/imageCard';
import { LikeButton } from '../../../components/likeButtons';
import { ProfileInfoBox } from '../../../components/profiles';
import {
    Box,
    Container,
    Inner,
    HeadingWithBack,
} from '../../../components/theme';
import flatprofiles from '../../../resources/flatprofiles';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { NavigationButtons } from '../../../components/navigationButtons';
import { Icon } from 'react-native-elements';
import styles from './styles';

const Match = ({ route, navigation }) => {
    const { profile } = route.params;
    return (
        <Container
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onPressBack={() => navigation.goBack()}
            showNavBar
            navigation={navigation}
        >
            <Inner>
                <HeadingWithBack navigation={navigation}>
                    Matches
                </HeadingWithBack>
                <Box />
                <PublicProfileCard
                    profile={profile}
                    onClickMessage={() =>
                        navigation.navigate('Chat', { id: profile.id })
                    }
                />
            </Inner>
        </Container>
    );
};
export default Match;
