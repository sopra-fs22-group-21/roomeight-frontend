import React from 'react';
import { Button, FlatList } from 'native-base';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { Container, Heading, SmallHeading } from '../../components/theme';
import { loadMessages } from '../../redux/actions/chatActions';

const Chat = ({ navigation }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.authState);

    const chats = useSelector((state) => state.chatState.chats, shallowEqual);

    const renderItem = ({ item }) => {
        return <ChatListItem chat={chats[item]} key={item} />;
    };

    return (
        <Container navigation={navigation} showNavBar>
            <SmallHeading>Chat</SmallHeading>
            <CreateNewChat />
            {chats && chats!=null(
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
    );
};
export default Chat;
