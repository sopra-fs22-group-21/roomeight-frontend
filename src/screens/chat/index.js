import { Center, FlatList, HStack, Spacer } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { ScreenContainer } from '../../components/screenContainer';
import { Box, SmallHeading } from '../../components/theme';
import en from '../../resources/strings/en.json';

const Chat = ({ navigation }) => {
    const chats = useSelector((state) => state.chatState.chats);

    const renderItem = ({ item }) => {
        return <ChatListItem chat={chats[item]} key={item} />;
    };

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
            {!chats && (
                <Center>
                    <SmallHeading style={{ paddingTop: '50%' }}>
                        {en.chat.noChats}
                    </SmallHeading>
                </Center>
            )}
        </ScreenContainer>
    );
};
export default Chat;
