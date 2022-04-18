import React, { useState } from 'react';
import { Text } from 'react-native';
import NavBar from '../../components/navbar';
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
