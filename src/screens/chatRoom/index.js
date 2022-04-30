import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Container, SmallHeadingWithBack } from '../../components/theme';
import { sendMessage } from '../../redux/actions/chatActions';
import { ScreenContainer } from '../../components/screenContainer';

export const Chatroom = ({ route, navigation }) => {
    const chatInfo = route.params.chatInfo;
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { auth } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const previousMessages = useSelector(
        (state) => state.chatState.messages[chatInfo._id]
    );
    const [messages, setMessages] = useState([]);
    //sets messages to previous messages if they exist
    useEffect(() => {
        if (previousMessages) {
            console.log(previousMessages);
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
        dispatch(sendMessage(newMessage, chatInfo._id));
    }, []);

    let matchprofile;
    if (userprofile.isSearching) {
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
            <SmallHeadingWithBack
                onPress={() => {
                    navigation.navigate('Match', {
                        profile: matchprofile,
                    });
                }}
                navigation={navigation}
            >
                {userprofile.isSearching
                    ? chatInfo.title.forUser
                    : chatInfo.title.forFlat}
            </SmallHeadingWithBack>
            <GiftedChat
                messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
                onSend={(newMessage) => onSend(newMessage[0])}
                user={{
                    _id: auth.uid,
                    name: userprofile.firstName + ' ' + userprofile.lastName,
                    avatar: 'https://placeimg.com/140/140/any',
                }}
                messageIdGenerator={() => 'msg-' + uuidv4()}
                alwaysShowSend
                showUserAvatar
            />
        </ScreenContainer>
    );
};

export default Chatroom;
