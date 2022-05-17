import {
    get,
    limitToLast,
    onChildAdded,
    onValue,
    orderByChild,
    query,
    set,
    ref,
    remove,
    update,
    serverTimestamp,
    onDisconnect,
} from 'firebase/database';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../../../firebase/firebase-config';
import en from '../../resources/strings/en';
import * as Constants from '../constants';

const chatMembershipChange = (chatId) => ({
    type: Constants.CHAT_MEMBERSHIP_CHANGE,
    payload: chatId,
});

const chatInfoChange = (chatInfo) => ({
    type: Constants.CHAT_INFO_CHANGE,
    payload: chatInfo,
});

const newChatMessage = (chatId, messages) => ({
    type: Constants.NEW_CHAT_MESSAGE,
    payload: { chatId, messages },
});

const loadMessagesSuccess = (chatId, messages) => ({
    type: Constants.LOAD_MESSAGES_SUCCESS,
    payload: { chatId, messages },
});

const loadMessagesFailure = (error) => ({
    type: Constants.LOAD_MESSAGES_FAILURE,
    payload: error,
});

const sendMessageFailure = (error) => ({
    type: Constants.SEND_MESSAGE_FAILURE,
    payload: error,
});

const createChatFailure = (error) => ({
    type: Constants.CREATE_CHAT_FAILURE,
    payload: error,
});

const deleteChatFailure = (error) => ({
    type: Constants.DELETE_CHAT_FAILURE,
    payload: error,
});

/**
 * Attatches a listener to the db where all active chats are stored!
 * @dispatches {@link Constants.CHAT_MEMBERSHIP_LISTENER_STARTED } on request start
 * @dispatches {@link chatMembershipChange} on changes to the db
 * @returns the unsbscribe object of the ChatIds listener
 */
export const chatMemberShipListener = () => (dispatch, getState) => {
    dispatch({
        type: Constants.CHAT_MEMBERSHIP_LISTENER_STARTED,
    });
    const uid = getState().authState.auth.uid;
    const chatReference = ref(database, `/memberships/${uid}`);
    return onChildAdded(chatReference, (snapshot) => {
        const chatId = snapshot.key;
        if (snapshot.exists()) {
            dispatch(chatMembershipChange(chatId));
            dispatch(chatInfoListener(chatId));
        }
    });
};

/**
 * initialy loads the first 100 messages of all chats
 * @dispatches {@link Constants.LOAD_MESSAGES_REQUEST} on request start
 * @dispatches {@link loadMessagesSuccess} on success
 * @dispatches {@link loadMessagesFailure} on failure
 */
export const loadMessages = (chatId) => (dispatch) => {
    dispatch({
        type: Constants.LOAD_MESSAGES_REQUEST,
        payload: chatId,
    });
    const messageRef = ref(database, '/messages/' + chatId);
    const queryParams = query(
        messageRef,
        orderByChild('createdAt'),
        limitToLast(100)
    );
    get(queryParams)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const messages = snapshot.val();
                dispatch(loadMessagesSuccess(chatId, messages));
            }
        })
        .catch((error) => {
            dispatch(loadMessagesFailure(error));
        });
};

/**
 * starts a listener to the chat information of the chatId provided
 * @param {string} chatId the chatId to listen to
 * @dispatches {@link Constants.CHAT_INFO_LISTENER_STARTED } on request start
 * @dispatches {@link Constants.CHAT_INFO_CHANGE} on changes to the db
 * @returns unsubsribe object
 */
export const chatInfoListener = (chatId) => (dispatch) => {
    dispatch({
        type: Constants.CHAT_INFO_LISTENER_STARTED,
        payload: chatId,
    });
    const chatReference = ref(database, `/chats/${chatId}`);
    let listener = onValue(chatReference, (snapshot) => {
        const chatInfo = snapshot.val();
        if (snapshot.exists()) {
            dispatch(chatInfoChange(chatInfo));
        }
    });
    dispatch(loadMessages(chatId));
    dispatch(chatMessagesListener(chatId));
    return listener;
};

/**
 * starts a listener to the newestMessage of the chatId provided
 * @param {string} chatId the chatId to listen to new messages
 * @dispatches {@link Constants.CHAT_MESSAGES_LISTENER_STARTED } on request start
 * @dispatches {@link newChatMessage } on changes to the messages
 * @returns unsubsribe object
 */
export const chatMessagesListener = (chatId) => (dispatch) => {
    dispatch({
        type: Constants.CHAT_MESSAGES_LISTENER_STARTED,
        payload: chatId,
    });
    const chatReference = ref(database, `/messages/${chatId}`);
    const queryParams = query(
        chatReference,
        orderByChild('createdAt'),
        limitToLast(1)
    );
    return onChildAdded(queryParams, (snapshot) => {
        const messages = snapshot.val();
        if (snapshot.exists()) {
            dispatch(newChatMessage(chatId, messages));
        }
    });
};

/**
 * saves the message to the db and updates the messages state via the {@link newChatMessage}
 * @param {messageObject} message
 * @param {uid of the chata} chatId
 * @dispatches {@link Constants.SEND_MESSAGE_REQUEST } on request start
 * @dispatches {@link sendMessageFailure} on failure
 */
export const sendMessage = (message, chatId) => async (dispatch) => {
    dispatch({
        type: Constants.SEND_MESSAGE_REQUEST,
        payload: message,
    });
    const updates = {};
    updates[`/messages/${chatId}/${message._id}`] = message;
    update(ref(database), updates)
        .then(() => {
            dispatch({
                type: Constants.SEND_MESSAGE_SUCCESS,
            });
        })
        .catch((error) => {
            dispatch(sendMessageFailure(error));
        });
};

export const goToChat = (profileId, navigation) => (dispatch, getState) => {
    const chats = getState().chatState.chats;
    let exists = false;
    let previousChat;
    if (chats) {
        Object.values(chats).every((chat) => {
            if (chat.userId === profileId || chat.flatId === profileId) {
                console.log('true');
                exists = true;
                previousChat = chat;
                return false;
            } else {
                return true;
            }
        });
    }
    if (!exists) {
        dispatch(createChat(profileId)).then((chat) => {
            navigation.navigate('Chatroom', { chatInfo: chat });
        });
    } else {
        navigation.navigate('Chatroom', { chatInfo: previousChat });
    }
};

/**
 * writes a new chatId to the db and updates the chats state via the {@link chatMembershipChange}
 * @param {chatInfoObject} chatInfo
 * @dispatches {@link Constants.CREATE_CHAT_REQUEST } on request start
 * @dispatches {@link Constants.CREATE_CHAT_SUCCESS } on success
 * @dispatches {@link createNewChatFailure} on failure
 */
export const createChat = (profileId) => (dispatch, getState) => {
    dispatch({
        type: Constants.CREATE_CHAT_REQUEST,
    });

    //create unique chat id
    const chatId = 'chat-' + uuidv4();
    const firstMessageId = 'msg-' + uuidv4();

    const chatUpdate = {};
    const userprofile = getState().userprofileState.userprofile;
    const matchprofile = getState().matchesState.matches[profileId];

    let chatInfo = {
        members: {},
    };
    chatInfo['_id'] = chatId;
    chatInfo['createdAt'] = new Date().getTime();

    if (profileId.startsWith('flt$')) {
        //want to chat with flat
        //let matchprofile = userprofile.matches[profileId];
        let roomMates = matchprofile.roomMates;
        roomMates.forEach((mateId) => (chatInfo['members'][mateId] = true));
        chatInfo = {
            ...chatInfo,
            title: {
                forFlat: userprofile.firstName + ' ' + userprofile.lastName,
                forUser: matchprofile.name,
            },
            members: {
                ...chatInfo.members,
                [userprofile.profileId]: true,
            },
            flatId: profileId,
            userId: userprofile.profileId,
        };
    } else {
        //want to chat with user
        let flatprofile = getState().flatprofileState.flatprofile;
        let roomMates = Object.keys(flatprofile.roomMates);
        roomMates.forEach((mateId) => (chatInfo['members'][mateId] = true));
        chatInfo = {
            ...chatInfo,
            title: {
                forFlat: matchprofile.firstName + ' ' + matchprofile.lastName,
                forUser: flatprofile.name,
            },
            members: {
                ...chatInfo.members,
                [profileId]: true,
            },
            flatId: flatprofile.profileId,
            userId: profileId,
        };
    }

    chatUpdate[`/chats/${chatId}`] = chatInfo;
    const firstMessage = {
        _id: firstMessageId,
        text: userprofile.firstName + ' ' + en.chat.startedChat,
        createdAt: new Date().getTime(),
        user: {
            _id: userprofile.profileId,
            name: userprofile.firstName + ' ' + userprofile.lastName,
        },
        system: true,
    };

    return update(ref(database), chatUpdate)
        .then(() => {
            dispatch({
                type: Constants.CREATE_CHAT_SUCCESS,
            });
            dispatch(sendMessage(firstMessage, chatId));
            return chatInfo;
        })
        .catch((error) => {
            dispatch(createChatFailure(error));
        });
};
/**
 * removes the chat from the db
 * @param {*} chatId
 * @dispatches {@link Constants.DELETE_CHAT_REQUEST } on request start
 * @dispatches {@link Constants.DELETE_CHAT_SUCCESS } on success
 * @dispatches {@link deleteChatFailure} on failure
 */
export const deleteChat = (chatId) => (dispatch, getState) => {
    dispatch({
        type: Constants.DELETE_CHAT_REQUEST,
    });
    let errorOccured = false;
    const references = [];
    references.push(ref(database, `/chats/${chatId}`));
    references.push(ref(database, `/messages/${chatId}`));
    references.push(
        ref(database, `/memberships/${getState().authState.auth.uid}/${chatId}`)
    );

    references.forEach((refrence) => {
        remove(refrence).catch((error) => {
            errorOccured = true;
            dispatch(deleteChatFailure(error));
        });
    });
    if (!errorOccured) {
        dispatch({
            type: Constants.DELETE_CHAT_SUCCESS,
        });
    }
};

export const connectionChanges = () => (dispatch, getState) => {
    dispatch({
        type: 'CONNECTION_CHANGES_START',
    });
    const userId = getState().authState.auth.uid;
    const statusRef = ref(database, `/memberships/${userId}/status`);
    const offline = {
        status: 'offline',
        lastChanged: serverTimestamp(),
    };
    const online = {
        status: 'online',
        lastChanged: serverTimestamp(),
    };
    onValue(ref(database, '.info/connected'), (snapshot) => {
        if (snapshot.val() === false) {
            console.log('not connected');
            return;
        }
        console.log('connected');
        onDisconnect(statusRef)
            .set(offline)
            .then(() => {
                console.log('set online');
                set(statusRef, online);
            });
    });
};
