import {
    get,
    limitToLast,
    onChildAdded,
    onDisconnect,
    onValue,
    orderByChild,
    query,
    ref,
    update,
} from 'firebase/database';
import 'react-native-get-random-values';
import { database } from '../../../firebase/firebase-config';
import apiClient from '../../helper/apiClient';
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
        dispatch(createChat(profileId)).then((chatId) => {
            navigation.navigate('Chatroom', { chatId: chatId });
        });
    } else {
        navigation.navigate('Chatroom', { chatId: previousChat._id });
    }
};

/**
 * writes a new chatId to the db and updates the chats state via the {@link chatMembershipChange}
 * @param {chatInfoObject} chatInfo
 * @dispatches {@link Constants.CREATE_CHAT_REQUEST } on request start
 * @dispatches {@link Constants.CREATE_CHAT_SUCCESS } on success
 * @dispatches {@link createNewChatFailure} on failure
 */
export const createChat = (profileId) => (dispatch) => {
    dispatch({
        type: Constants.CREATE_CHAT_REQUEST,
    });
    return apiClient()
        .post(`/chats/${profileId}`, {})
        .then((response) => {
            dispatch({
                type: Constants.CREATE_CHAT_SUCCESS,
                payload: response.data,
            });
            return response.data;
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
export const deleteChat = (chatId) => (dispatch) => {
    dispatch({
        type: Constants.DELETE_CHAT_REQUEST,
    });
    return apiClient()
        .delete(`/chats/${chatId}`, {})
        .then((response) => {
            dispatch({
                type: Constants.DELETE_CHAT_SUCCESS,
                payload: response.data,
            });
            return response.data;
        })
        .catch((error) => {
            dispatch(deleteChatFailure(error));
        });
};

export const connectionChanges = () => (dispatch, getState) => {
    if (getState().chatState.memberships === null) {
        return;
    }
    dispatch({
        type: Constants.CONNECTION_CHANGE,
    });
    const memberships = Object.keys(getState().chatState.memberships);

    const userId = getState().authState.auth.uid;
    const chatsReference = ref(database, '/chats');

    const setStatus = (status) => {
        const updates = {};
        memberships.forEach((chatId) => {
            updates[`${chatId}/members/${userId}`] = status;
        });
        return updates;
    };

    onValue(ref(database, '.info/connected'), (snapshot) => {
        if (snapshot.val() === false) {
            console.log('not connected');
            return;
        }
        console.log('connected');
        onDisconnect(chatsReference)
            .update(setStatus('offline'))
            .then(() => {
                console.log('set online');
                update(chatsReference, setStatus('online'));
            });
    });
};
