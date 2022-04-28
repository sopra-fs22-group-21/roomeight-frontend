import { Center, FlatList, HStack, Spacer } from 'native-base';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ChatListItem from '../../components/ChatListItem';
import CreateNewChat from '../../components/createNewChat';
import { Container, SmallHeading } from '../../components/theme';
import en from '../../resources/strings/en.json';

const Chat = ({ navigation }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.authState);
    const {isSearching} = useSelector((state) => state.userprofileState.userprofile);
    const chats = useSelector((state) => state.chatState.chats);

    const renderItem = ({ item }) => {
        return <ChatListItem chat={chats[item]} key={item} />;
    };

    return (
        <Container navigation={navigation} showNavBar>
            <HStack>
                <SmallHeading>{en.chat.heading}</SmallHeading>
                <Spacer />
                <CreateNewChat />
            </HStack>
            {chats && (
                <FlatList
                    data={Object.keys(chats)}
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
        </Container>
    );
};
export default Chat;
