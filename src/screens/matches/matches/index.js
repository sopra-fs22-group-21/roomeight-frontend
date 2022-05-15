import React, { useState } from 'react';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../components/profiles';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeading } from '../../../components/theme';
import styles from './styles';
import { Text } from 'react-native';
import MatchesFlat from './matchesFlat';
import LikesFlat from './likesFlat';
import en from '../../../resources/strings/en.json';
import { EmptyCard } from '../../../components/publicProfileCard';

const Matches = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [isFlat] = useState(userprofile.isAdvertisingRoom ? true : false);
    const [index, setIndex] = useState(0);

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

    if (isFlat) {
        return (
            <ScreenContainer navigation={navigation} showNavBar>
                {index === 0 ? (
                    <SmallHeading style={styles.heading}>Matches</SmallHeading>
                ) : (
                    <SmallHeading style={styles.heading}>Likes</SmallHeading>
                )}
                <Tab
                    value={index}
                    onChange={(e) => {
                        setIndex(e);
                    }}
                    indicatorStyle={styles.indicator}
                    variant="default"
                >
                    <Tab.Item
                        containerStyle={styles.tab}
                        icon={{
                            name: 'done-all',
                            type: 'material-icons',
                            color: 'black',
                            size: 25,
                        }}
                    />
                    <Tab.Item
                        containerStyle={styles.tab}
                        icon={{
                            name: 'favorite',
                            type: 'material-icons',
                            color: 'black',
                            size: 24,
                        }}
                    />
                </Tab>
                {index === 0 ? (
                    <MatchesFlat navigation={navigation} />
                ) : (
                    <LikesFlat navigation={navigation} profile={userprofile} />
                )}
            </ScreenContainer>
        );
    } else {
        return (
            <ScreenContainer navigation={navigation} showNavBar>
                <SmallHeading>{en.matches.heading}</SmallHeading>
                <Box />
                {matchesList.length > 0 ? matchesList : noMatches}
            </ScreenContainer>
        );
    }
};
export default Matches;
