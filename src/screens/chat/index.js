import { FlatList, Heading } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { Container, Screen } from '../../components/theme';

const Chat = ({ navigation }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.authState);

    const chats = useSelector((state) => state.chatState.chats, shallowEqual);

    const renderItem = ({ item }) => {
        return <ChatListItem chat={chats[item]} />;
    };

    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Heading size="xl">Chat</Heading>
                <CreateNewChat />
                {chats && (
                    <FlatList
                        data={Object.keys(chats)}
                        removeClippedSubviews
                        renderItem={renderItem}
                        keyExtractor={(index) => index}
                    />
                )}
                {!chats && <Heading size="xl">No chats yet</Heading>}
            </Container>
        </Screen>
    );
};
export default Chat;
