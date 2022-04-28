import React from 'react';
import { Button, FlatList } from 'native-base';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { Container, Heading, SmallHeading } from '../../components/theme';
import { loadMessages } from '../../redux/actions/chatActions';
import en from '../../resources/strings/en.json';

const Chat = ({ navigation }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.authState);

    const chats = useSelector((state) => state.chatState.chats, shallowEqual);

    const renderItem = ({ item }) => {
        return <ChatListItem chat={chats[item]} key={item} />;
    };

    return (
        <Container navigation={navigation} showNavBar>
            <SmallHeading>{en.chat.heading}</SmallHeading>
            <CreateNewChat />
            {chats && (
                <FlatList
                    data={Object.keys(chats)}
                    removeClippedSubviews
                    renderItem={renderItem}
                    keyExtractor={(index) => index}
                />
            )}
            {!chats && <Heading size="xl">{en.chat.noChats}</Heading>}
        </Container>
    );
};
export default Chat;
