import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { ImageCard } from '../../../components/imageCard';
import { LikeButton } from '../../../components/likeButtons';
import { ProfileInfoBox } from '../../../components/profiles';
import { Box, SmallHeading } from '../../../components/theme';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { useSelector } from 'react-redux';
import apiClient from '../../../helper/apiClient';
import { ScreenContainer } from '../../../components/screenContainer';

const Matches = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);

    return (
        <ScreenContainer navigation={navigation} showNavBar>
            <SmallHeading>Matches</SmallHeading>
            <Box />
            {Object.values(matches).map((profile, index) => {
                console.log('match: ' + profile.profileId);
                if (profile.profileId)
                    return (
                        <ProfileInfoBox
                            profile={profile}
                            id={profile.profileId}
                            key={index}
                            onPress={(id) => {
                                navigation.navigate('Match', {
                                    profile: profile,
                                });
                            }}
                        />
                    );
            })}
        </ScreenContainer>
    );
};
export default Matches;
