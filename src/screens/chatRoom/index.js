import { HStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ScreenContainer } from '../../components/screenContainer';
import { SmallHeadingWithBack } from '../../components/theme';
import { sendMessage } from '../../redux/actions/chatActions';

export const Chatroom = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const chatInfo = useSelector(
        (state) => state.chatState.chats[route.params.chatId]
    );
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { auth } = useSelector((state) => state.authState);
    const previousMessages = useSelector(
        (state) => state.chatState.messages[route.params.chatId]
    );
    const flatPresence = useSelector(
        (state) => state.chatState.chats[route.params.chatId]?.presence?.flat
    );
    const userPresence = useSelector(
        (state) => state.chatState.chats[route.params.chatId]?.presence?.user
    );
    const [presence, setPresence] = useState('');

    useEffect(() => {
        let status;
        if (userprofile.isSearchingRoom) {
            status = flatPresence?.status;
        } else {
            status = userPresence?.status;
        }
        if (status === 'online') {
            setPresence('green');
        } else {
            setPresence('red');
        }
    }, [flatPresence, userPresence]);

    const [messages, setMessages] = useState([]);

    //updates the messages if the store changed
    useEffect(() => {
        if (previousMessages) {
            setMessages(Object.values(previousMessages));
        }
    }, [previousMessages]);
    //callback for sending message
    const onSend = useCallback((newMessage = {}) => {
        //modify attributess
        newMessage['pending'] = true;
        newMessage['createdAt'] = new Date().getTime();
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessage)
        );
        newMessage['pending'] = false;
        newMessage['sent'] = true;
        dispatch(sendMessage(newMessage, route.params.chatId));
    }, []);

    let matchprofile;
    if (userprofile.isSearchingRoom) {
        matchprofile = useSelector(
            (state) => state.matchesState.matches[chatInfo.flatId]
        );
    } else {
        matchprofile = useSelector(
            (state) => state.matchesState.matches[chatInfo.userId]
        );
    }
    return (
        <ScreenContainer>
            <HStack space={10}>
                <SmallHeadingWithBack
                    onPress={() => {
                        navigation.navigate('Match', {
                            profile: matchprofile,
                        });
                    }}
                    navigation={navigation}
                >
                    {userprofile.isSearchingRoom
                        ? chatInfo.title.forUser
                        : chatInfo.title.forFlat}
                </SmallHeadingWithBack>
                <View
                    style={{
                        marginTop: 11,
                        height: 20,
                        width: 20,
                        backgroundColor: presence,
                        borderRadius: 100,
                    }}
                ></View>
            </HStack>
            <GiftedChat
                messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
                onSend={(newMessage) => onSend(newMessage[0])}
                user={{
                    _id: auth.uid,
                    name: userprofile.firstName + ' ' + userprofile.lastName,
                }}
                messageIdGenerator={() => 'msg-' + uuidv4()}
                alwaysShowSend
                renderUsernameOnMessage
                renderAvatar={null}
            />
        </ScreenContainer>
    );
};

export default Chatroom;
