import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicProfileCard } from '../../../components/publicProfileCard';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SmallHeadingWithBack } from '../../../components/theme';
import { createChat } from '../../../redux/actions/chatActions';
import en from '../../../resources/strings/en.json';
const Match = ({ route, navigation }) => {
    const { profile } = route.params;
    const { chats } = useSelector((state) => state.chatState);
    const dispatch = useDispatch();
    return (
        <ScreenContainer showNavBar navigation={navigation}>
            <SmallHeadingWithBack navigation={navigation}>
                {en.matches.heading}
            </SmallHeadingWithBack>
            <Box />
            <Box style={{ flex: 1 }}>
                <PublicProfileCard
                    profile={profile}
                    isFlat={profile.isAdvertisingRoom}
                    onClickMessage={() => {
                        let exists = false;
                        if (chats) {
                            Object.values(chats).forEach((chat) => {
                                if (
                                    chat.userId === profile.profileId ||
                                    chat.flatId === profile.profileId
                                ) {
                                    exists = true;
                                    navigation.navigate('Chatroom', {
                                        chatInfo: chat,
                                    });
                                }
                            });
                            if (!exists) {
                                dispatch(createChat(profile.profileId));
                                navigation.navigate('Chat');
                            }
                        } else {
                            dispatch(createChat(profile.profileId));
                            navigation.navigate('Chat');
                        }
                    }}
                />
            </Box>
        </ScreenContainer>
    );
};
export default Match;
