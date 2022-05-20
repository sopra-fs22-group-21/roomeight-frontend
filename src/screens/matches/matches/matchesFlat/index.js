import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../../components/profiles';
import { EmptyCard } from '../../../../components/publicProfileCard';
import { Box } from '../../../../components/theme';
import en from '../../../../resources/strings/en.json';

const MatchesFlat = ({ navigation }) => {
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
export default MatchesFlat;
