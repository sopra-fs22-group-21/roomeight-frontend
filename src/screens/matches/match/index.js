import React from 'react';
import { useDispatch } from 'react-redux';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeadingWithBack } from '../../../components/theme';
import { goToChat } from '../../../redux/actions/chatActions';
const Match = ({ route, navigation }) => {
    const { profile } = route.params;
    const dispatch = useDispatch();
    return (
        <ScreenContainer showNavBar navigation={navigation}>
            <SmallHeadingWithBack
                navigation={navigation}
            ></SmallHeadingWithBack>
            <Box />
            <Box style={{ flex: 1 }}>
                <PublicProfileCard
                    profile={profile}
                    isFlat={profile.isAdvertisingRoom}
                    onClickMessage={() => {
                        dispatch(goToChat(profile.profileId, navigation));
                    }}
                />
            </Box>
        </ScreenContainer>
    );
};
export default Match;
