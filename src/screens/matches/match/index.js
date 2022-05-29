import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M8Loader from '../../../../assets/logo/M8Loader';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeadingWithBack } from '../../../components/theme';
import { goToChat } from '../../../redux/actions/chatActions';

const Match = ({ route, navigation }) => {
    const { profile } = route.params;
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.chatState);

    return (
        <ScreenContainer showNavBar navigation={navigation}>
            <SmallHeadingWithBack
                navigation={navigation}
            ></SmallHeadingWithBack>
            <Box />
            <Box style={{ flex: 1 }}>
                {loading ? (
                    <M8Loader />
                ) : (
                    <PublicProfileCard
                        profile={profile}
                        isFlat={profile.isAdvertisingRoom}
                        onClickMessage={() => {
                            dispatch(goToChat(profile.profileId, navigation));
                        }}
                    />
                )}
            </Box>
        </ScreenContainer>
    );
};
export default Match;
