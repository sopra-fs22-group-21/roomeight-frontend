import React, { useState } from 'react';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useSelector } from 'react-redux';
import { MatchesMap } from '../../../components/addressMap';
import { ProfileInfoBox } from '../../../components/profiles';
import { EmptyCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { SmallHeading } from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import LikesFlat from './likesFlat';
import MatchesFlat from './matchesFlat';
import styles from './styles';

const Matches = ({ navigation }) => {
    const { matches } = useSelector((state) => state.matchesState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [index, setIndex] = useState(0);

    const secondTab = userprofile.isAdvertisingRoom ? (
        <LikesFlat navigation={navigation} profile={userprofile} />
    ) : (
        <MatchesMap navigation={navigation} />
    );
    const secondHeading = userprofile.isAdvertisingRoom
        ? en.matches.incompleteMatches
        : en.matches.heading;
    const secondIcon = userprofile.isAdvertisingRoom
        ? 'heart-half-full'
        : 'map-marker-radius';

    return (
        <ScreenContainer navigation={navigation} showNavBar>
            {index === 0 ? (
                <SmallHeading style={styles.heading}>Matches</SmallHeading>
            ) : (
                <SmallHeading style={styles.heading}>
                    {secondHeading}
                </SmallHeading>
            )}
            {
                <>
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
                    {index === 0 ? (
                        <MatchesFlat navigation={navigation} />
                    ) : (
                        secondTab
                    )}
                </>
            }
        </ScreenContainer>
    );
};
export default Matches;
