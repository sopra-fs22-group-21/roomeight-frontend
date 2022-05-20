import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import en from '../../resources/strings/en.json';
import { ProfileInfoBox } from '../profiles';
import { EmptyCard } from '../publicProfileCard';
import { Box } from '../theme';

export const MatchesList = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    if (Object.keys(matches).length < 1)
        return <EmptyCard textIfNoData={en.matches.noMatches} />;
    return (
        <View>
            <Box />
            {Object.values(matches).map((profile, index) => {
                if (profile.profileId)
                    return (
                        <ProfileInfoBox
                            navigation={navigation}
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
        </View>
    );
};
export default MatchesList;
