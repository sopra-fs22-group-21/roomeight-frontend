import React from 'react';
import { Text } from 'react-native';
import { Container } from '../../components/theme';

const Chat = ({ navigation }) => {
    return (
        <Container navigation={navigation} showNavBar>
            <Text>Chat</Text>
        </Container>
    );
};
export default Chat;
