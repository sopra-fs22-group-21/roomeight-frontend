import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../components/profiles';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeading } from '../../../components/theme';

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
