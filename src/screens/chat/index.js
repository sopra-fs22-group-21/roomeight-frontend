import { Button, FlatList, Heading } from 'native-base';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { Container, Screen } from '../../components/theme';
import { loadMessages } from '../../redux/actions/chatActions';

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
                <Button
                    onPress={() => {
                        dispatch(
                            loadMessages(
                                'CHAT-2fc014ea-0c76-468f-9451-1199e49d3207'
                            )
                        );
                    }}
                />
            </Container>
        </Screen>
    );
};
export default Chat;
