import { onValue, ref, remove, set, update, push } from 'firebase/database';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../../../firebase/firebase-config';
import * as Constants from '../constants';

const chatMembershipChange = (chats) => ({
    type: Constants.CHAT_MEMBERSHIP_CHANGE,
    payload: chats,
});

const chatInfoChange = (chatid, chat) => ({
    type: Constants.CHAT_INFO_CHANGE,
    payload: { chatid, chat },
});

const chatMessagesChange = (chatid, messages) => ({
    type: Constants.CHAT_MESSAGES_CHANGE,
    payload: { chatid, messages },
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
 * @dispatches {@link Constant.CHAT_MEMBERSHIP_CHANGE} on changes to the db
 * @returns the unsbscribe object of the ChatIds listener
 */
export const chatMemberShipListener = () => (dispatch, getState) => {
    dispatch({
        type: Constants.CHAT_MEMBERSHIP_LISTENER_STARTED,
    });
    const uid = getState().authState.auth.uid;
    console.log(uid);
    const chatReference = ref(database, `/users/${uid}`);
    return onValue(chatReference, (snapshot) => {
        const chatIds = snapshot.val();
        console.log(chatIds);
        dispatch(chatMembershipChange(chatIds));
        dispatch(chatInfoListener());
    });
};
/**
 * starts a listener to the chat information of each chat the user is a member of
 * @dispatches {@link Constants.CHAT_INFO_LISTENER_STARTED } on request start
 * @dispatches {@link Constants.CHAT_INFO_CHANGE} on changes to the db
 * @returns an array of unsubsribe objects for each chat
 */
export const chatInfoListener = () => (dispatch, getState) => {
    dispatch({
        type: Constants.CHAT_INFO_LISTENER_STARTED,
    });
    const chats = getState().chatState.chats;
    if (!chats) {
        return;
    }
    const chatids = Object.keys(getState().chatState.chats);
    let listeners = [];
    chatids.forEach((chatid) => {
        const chatReference = ref(database, `/chats/${chatid}`);
        let listener = onValue(chatReference, (snapshot) => {
            const chatInfo = snapshot.val();
            dispatch(chatInfoChange(chatid, chatInfo));
        });
        listeners.push(listener);
    });
    dispatch(chatMessagesListener());
    return listeners;
};

/**
 * starts a listener to the messages of all chats the user is a member of
 * @dispatches {@link Constants.CHAT_MESSAGES_LISTENER_STARTED } on request start
 * @dispatches {@link chatMessagesChange } on changes to the messages
 * @returns
 */
export const chatMessagesListener = () => (dispatch, getState) => {
    dispatch({
        type: Constants.CHAT_MESSAGES_LISTENER_STARTED,
    });
    const chatids = Object.keys(getState().chatState.chats);
    let listeners = [];
    chatids.forEach((chatid) => {
        const chatReference = ref(database, `/messages/${chatid}`);
        let listener = onValue(chatReference, (snapshot) => {
            const messages = snapshot.val();
            dispatch(chatMessagesChange(chatid, messages));
        });
        listeners.push(listener);
    });
    return listeners;
};

/**
 * saves the message to the db and updates the messages state via the {@link chatMessagesChange}
 * @param {messageObject} message
 * @param {uid of the chata} chatId
 * @dispatches {@link Constants.SEND_MESSAGE_REQUEST } on request start
 * @dispatches {@link sendMessageFailure} on failure
 */
export const sendMessage = (message, chatId) => async (dispatch, getState) => {
    dispatch({
        type: Constants.SEND_MESSAGE_REQUEST,
    });
    const chatReference = ref(database, `/messages/${chatId}/${message._id}`);
    const updates = {};
    updates[`/messages/${chatId}/${message._id}`] = message;
    updates[`/chats/${chatId}/lastMessage`] = message.text;
    updates[`/chats/${chatId}/timeStamp`] = message.createdAt;
    await update(ref(database), updates, function (error) {
        console.log('completion');
        if (!error) {
            dispatch({
                type: Constants.SEND_MESSAGE_SUCCESS,
            });
        } else {
            dispatch(sendMessageFailure(error));
        }
    });
};

/**
 * writes a new chatid to the db and updates the chats state via the {@link chatMembershipChange}
 * @param {chatInfoObject} chatInfo
 * @dispatches {@link Constants.CREATE_CHAT_REQUEST } on request start
 * @dispatches {@link Constants.CREATE_CHAT_SUCCESS } on success
 * @dispatches {@link createNewChatFailure} on failure
 * @todo where do i get the chatInfoObject from??
 */
export const createChat = (chatInfo) => (dispatch, getState) => {
    dispatch({
        type: Constants.CREATE_CHAT_REQUEST,
    });
    //create unique chat id
    const chatId = 'CHAT-' + uuidv4();

    const chatInfo = {
        _id: chatId,
        title: 'New ChatUpdates',
        members: {
            uid1: true,
            uid2: true,
        },
        createdAt: Date.now().getTime(),
    };

    const updates = {};
    updates[`/chats/${chatId}`] = chatInfo;
    updates[`/users/${getState().authState.auth.uid}/${chatId}`] = true;
    update(ref(database), updates)
        .then(() => {
            dispatch({
                type: Constants.CREATE_CHAT_SUCCESS,
            });
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
    let error = false;
    const references = [];
    references.push(ref(database, `/chats/${chatId}`));
    references.push(ref(database, `/messages/${chatId}`));
    references.push(
        ref(database, `/users/${getState().authState.auth.uid}/${chatId}`)
    );

    references.forEach((ref) => {
        remove(ref).catch((error) => {
            error = true;
            dispatch(deleteChatFailure(error));
        });
    });
    if (!error) {
        dispatch({
            type: Constants.DELETE_CHAT_SUCCESS,
        });
    }
};
