import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../components/profiles';
import { EmptyCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeading } from '../../../components/theme';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import styles from './styles';
import { Text } from 'react-native';
import MatchesFlat from './matchesFlat';
import LikesFlat from './likesFlat';
import en from '../../../resources/strings/en.json';
import { MatchesMap } from '../../../components/addressMap';

const Matches = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [index, setIndex] = useState(0);
    const secondTab = userprofile.isAdvertisingRoom ? (
        <LikesFlat navigation={navigation} profile={userprofile} />
    ) : (
        <MatchesMap navigation={navigation} />
    );
    const secondHeading = userprofile.isAdvertisingRoom ? 'Likes' : 'Matches';
    const secondIcon = userprofile.isAdvertisingRoom
        ? 'heart-half-full'
        : 'map-marker-radius';

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
            {index === 0 ? (
                <SmallHeading style={styles.heading}>Matches</SmallHeading>
            ) : (
                <SmallHeading style={styles.heading}>
                    {secondHeading}
                </SmallHeading>
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
                        name: 'heart',
                        type: 'material-community',
                        color: 'black',
                        size: 25,
                    }}
                />
                <Tab.Item
                    containerStyle={styles.tab}
                    icon={{
                        name: secondIcon,
                        type: 'material-community',
                        color: 'black',
                        size: 24,
                    }}
                />
            </Tab>
            {index === 0 ? <MatchesFlat navigation={navigation} /> : secondTab}
        </ScreenContainer>
    );
};
export default Matches;
