import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { ImageCard } from '../../../components/imageCard';
import { LikeButton } from '../../../components/likeButtons';
import { ProfileInfoBox } from '../../../components/profiles';
import {
    Box,
    Container,
    Inner,
    ScreenPadding,
    SmallHeading,
} from '../../../components/theme';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { useSelector } from 'react-redux';
import apiClient from '../../../helper/apiClient';

const Matches = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);

    return (
        <Container navigation={navigation} showNavBar>
            <SmallHeading>Matches</SmallHeading>
            <Box />
            {Object.values(userprofile.matches).map((profile) => {
                console.log(profile);
                if (profile.profileId)
                    return (
                        <ProfileInfoBox
                            profile={profile}
                            id={profile.profileId}
                            key={profile.profileId}
                            onPress={(id) => {
                                navigation.navigate('Match', {
                                    profile: profile,
                                });
                            }}
                        />
                    );
            })}
        </Container>
    );
};
export default Matches;
