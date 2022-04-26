import React, { useState } from 'react';
import {
    Box,
    Container,
    Inner,
    SmallHeadingWithBack,
    ScreenPadding,
} from '../../../components/theme';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { View } from 'react-native-animatable';

const Match = ({ route, navigation }) => {
    const { profile } = route.params;
    return (
        <Container showNavBar navigation={navigation}>
            <SmallHeadingWithBack navigation={navigation}>
                Matches
            </SmallHeadingWithBack>
            <Box />
            <View style={{ flex: 0.8 }}>
                <PublicProfileCard
                    profile={profile}
                    isFlat={profile.isAdvertisingRoom}
                    onClickMessage={() =>
                        navigation.navigate('Chat', { id: profile.id })
                    }
                />
            </View>
        </Container>
    );
};
export default Match;
