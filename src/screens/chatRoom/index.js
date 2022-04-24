import { Heading } from 'native-base';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Container, Screen } from '../../components/theme';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { sendMessage } from '../../redux/actions/chatActions';
import { useLinkBuilder } from '@react-navigation/native';

export const Chatroom = ({ route, navigartion }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { auth } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const previousMessages = useSelector(
        (state) => state.chatState.messages[`${route.params.chatId}`]
    );
    const [messages, setMessages] = useState([]);

    //sets messages to previous messages if they exist
    useEffect(() => {
        if (previousMessages) {
            setMessages(Object.values(previousMessages));
        }
    }, []);
    //updates the messages if the store changed
    useEffect(() => {
        if (previousMessages) {
            setMessages(Object.values(previousMessages));
        }
    }, [previousMessages]);

    //callback for sending message
    const onSend = useCallback((newMessage = []) => {
        console.log(newMessage);
        //modify attributess
        newMessage['pending'] = true;
        newMessage['createdAt'] = new Date().getTime();
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessage)
        );
        newMessage['pending'] = false;
        newMessage['sent'] = true;
        console.log(newMessage);
        dispatch(sendMessage(newMessage, route.params.chatId));
    }, []);

    return (
        <Screen>
            <Container>
                <Heading>Title</Heading>
                <GiftedChat
                    messages={messages.sort(
                        (a, b) => b.createdAt - a.createdAt
                    )}
                    onSend={(newMessage) => onSend(newMessage[0])}
                    user={{
                        _id: auth.uid,
                        name:
                            userprofile.firstName + ' ' + userprofile.lastName,
                        avatar: 'https://placeimg.com/140/140/any',
                    }}
                    messageIdGenerator={() => 'MESSAGE-' + uuidv4()}
                    alwaysShowSend
                    showUserAvatar
                />
            </Container>
        </Screen>
    );
};

export default Chatroom;
