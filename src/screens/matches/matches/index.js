import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../components/profiles';
import { EmptyCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeading } from '../../../components/theme';
import en from '../../../resources/strings/en.json';

const Matches = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);

    const matchesList = Object.values(matches).map((profile, index) => {
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
    });

    const noMatches = <EmptyCard textIfNoData={en.matches.noMatches} />;

    return (
        <ScreenContainer navigation={navigation} showNavBar>
            <SmallHeading>{en.matches.heading}</SmallHeading>
            <Box />
            {matchesList.length > 0 ? matchesList : noMatches}
        </ScreenContainer>
    );
};
export default Matches;
