import React from 'react';
import { Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, Screen } from '../../components/theme';

const Chat = ({ navigation }) => {

    const chats = useSelector(state => state.chatState.chats);

    const renderItem = ({ item }) => {
        return (
            <ChatListItem chat={item}/>
        );
    };

    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Text>Chat</Text>
                <FlatList
                    data={chats}
                    removeClippedSubviews
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </Container>
        </Screen>
    );
};
export default Chat;
