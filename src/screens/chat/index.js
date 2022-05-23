import { Center, FlatList, HStack, Spacer } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import M8Loader from '../../../assets/logo/M8Loader';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { EmptyCard } from '../../components/publicProfileCard';
import { ScreenContainer } from '../../components/screenContainer';
import { Box, SmallHeading } from '../../components/theme';
import en from '../../resources/strings/en.json';

const Chat = ({ route, navigation }) => {
    const { chats, loading } = useSelector((state) => state.chatState);

    const renderItem = ({ item }) => {
        return <ChatListItem chat={chats[item]} key={item} />;
    };

    if (route.params?.chatId && !loading) {
        navigation.navigate('Chatroom', { chatId: route.params.chatId });
    }

    if (loading) {
        return <M8Loader />;
    }

    return (
        <ScreenContainer navigation={navigation} showNavBar>
            <Box>
                <HStack alignItems="center">
                    <SmallHeading>{en.chat.heading}</SmallHeading>
                    <Spacer />
                    <CreateNewChat />
                </HStack>
            </Box>
            {chats && (
                <FlatList
                    data={Object.values(chats)
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((chat) => chat._id)}
                    removeClippedSubviews
                    renderItem={renderItem}
                    keyExtractor={(index) => index}
                />
            )}
            {!chats && <EmptyCard textIfNoData={en.chat.noChats} />}
        </ScreenContainer>
    );
};
export default Chat;
