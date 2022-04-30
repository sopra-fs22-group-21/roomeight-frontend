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
import en from '../../../resources/strings/en.json';
import { ScreenContainer } from '../../../components/screenContainer';
import { createChat } from '../../../redux/actions/chatActions';
import { useDispatch } from 'react-redux';
const Match = ({ route, navigation }) => {
    const { profile } = route.params;
    const dispatch = useDispatch();
    return (
        <ScreenContainer showNavBar navigation={navigation}>
            <SmallHeadingWithBack navigation={navigation}>
                {en.matches.heading}
            </SmallHeadingWithBack>
            <Box />
            <View style={{ flex: 0.8 }}>
                <PublicProfileCard
                    profile={profile}
                    isFlat={profile.isAdvertisingRoom}
                    onClickMessage={() =>{
                        dispatch(createChat(profile.profileId))
                        navigation.navigate('Chat', { id: profile.id })
                    }}
                />
            </View>
        </ScreenContainer>
    );
};
export default Match;
