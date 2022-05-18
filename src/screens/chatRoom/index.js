import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { ScreenContainer } from '../../components/screenContainer';
import { SmallHeadingWithBack } from '../../components/theme';
import { sendMessage } from '../../redux/actions/chatActions';
import { HStack } from 'native-base';

export const Chatroom = ({ route, navigation }) => {
    const chatInfo = useSelector((state) => state.chatState.chats[route.params.chatId]);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { auth } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const previousMessages = useSelector(
        (state) => state.chatState.messages[chatId]
    );
    const flatPresence = useSelector((state) => state.chatState.chats[route.params.chatId]?.presence.flat);
    const userPresence = useSelector((state) => state.chatState.chats[route.params.chatId]?.presence.user);
    const [presence, setPresence] = useState('');

    useEffect(() => {
        let status;
        if(userprofile.isSearchingRoom){
            status = flatPresence;
        }else{
            status = userPresence;
        }
        if(status === 'online'){
            setPresence('green');
        }else{
            setPresence('red');
        }
    }, [chatInfo]);

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
        dispatch(sendMessage(newMessage, chatId));
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
                <View style={{marginTop: 11, height: 20 , width: 20, backgroundColor: presence, borderRadius: 100}}></View>
            </HStack>
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
                renderUsernameOnMessage
                renderAvatar={null}
            />
        </ScreenContainer>
    );
};

export default Chatroom;
