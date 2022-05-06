import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../../components/profiles';
import { ScreenContainer } from '../../../../components/screenContainer';
import { Box, SmallHeading } from '../../../../components/theme';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { Text, View } from 'react-native';

const MatchesFlat = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    return (
        <View>
            <Box />
            {Object.values(matches).map((profile, index) => {
                console.log('match: ' + profile.profileId);
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
