import React from 'react';
import { Text } from 'react-native';
import { Container, Screen } from '../../components/theme';

const Chat = ({ navigation }) => {
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Text>Chat</Text>
            </Container>
        </Screen>
    );
};
export default Chat;
