import React, { useState } from 'react';
import { Text } from 'react-native';
import { ImageCard } from '../../../components/imageCard';
import { LikeButton } from '../../../components/likeButtons';
import { ProfileInfoBox } from '../../../components/profiles';
import {
    Box,
    Container,
    Screen,
    SmallHeading,
} from '../../../components/theme';
import flatprofiles from '../../../resources/flatprofiles';
import userprofiles from '../../../resources/userprofiles';
import { PublicProfileCard } from '../../../components/publicProfileCard';

const Matches = ({ navigation }) => {
    const initialProfiles = [...flatprofiles, ...userprofiles];
    const [expanded, setExpanded] = useState(null);
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <SmallHeading>Matches</SmallHeading>
                <Box />
                {initialProfiles.map((profile) => (
                    <ProfileInfoBox
                        profile={profile}
                        id={profile.id}
                        key={profile.id}
                        onPress={(id) => {
                            navigation.navigate('Match', { profile: profile });
                        }}
                    />
                ))}
            </Container>
        </Screen>
    );
};
export default Matches;
