import {
    get,
    limitToLast,
    onChildAdded,
    onValue,
    orderByChild,
    query,
    ref,
    remove,
    update,
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
 * @dispatches {@link Constant.CHAT_MEMBERSHIP_CHANGE} on changes to the db
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
        console.log(chatId);
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
                console.log(snapshot.val());
                snapshot.forEach((message) => {
                    console.log(message.val());
                });
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
        console.log(chatInfo);
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
    let listener = onChildAdded(queryParams, (snapshot) => {
        const messages = snapshot.val();
        if (snapshot.exists()) {
            dispatch(newChatMessage(chatId, messages));
        }
    });
    return listener;
};

/**
 * saves the message to the db and updates the messages state via the {@link newChatMessage}
 * @param {messageObject} message
 * @param {uid of the chata} chatId
 * @dispatches {@link Constants.SEND_MESSAGE_REQUEST } on request start
 * @dispatches {@link sendMessageFailure} on failure
 * @todo why is .catch executed without error???
 */
export const sendMessage = (message, chatId) => async (dispatch, getState) => {
    dispatch({
        type: Constants.SEND_MESSAGE_REQUEST,
        payload: message,
    });
    const updates = {};
    updates[`/messages/${chatId}/${message._id}`] = message;
    updates[`/chats/${chatId}/lastMessage`] = message.text;
    updates[`/chats/${chatId}/timeStamp`] = message.createdAt;
    updates[`/chats/${chatId}/lastSender`] = message.user.name;
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

/**
 * writes a new chatId to the db and updates the chats state via the {@link chatMembershipChange}
 * @param {chatInfoObject} chatInfo
 * @dispatches {@link Constants.CREATE_CHAT_REQUEST } on request start
 * @dispatches {@link Constants.CREATE_CHAT_SUCCESS } on success
 * @dispatches {@link createNewChatFailure} on failure
 * @todo where do i get the chatInfoObject from??
 */
export const createChat = (profileId) => (dispatch, getState) => {
    dispatch({
        type: Constants.CREATE_CHAT_REQUEST,
    });

    //create unique chat id
    const chatId = 'chat-' + uuidv4();
    const firstMessageId = 'msg-' + uuidv4();

    const membershipUpdate = {};
    const chatUpdate = {};
    const userprofile = getState().userprofileState.userprofile;
    let chatInfo = {
        members: {},
    };
    chatInfo['_id'] = chatId;
    chatInfo['createdAt'] = new Date().getTime();

    if (profileId.startsWith('flt$')) {
        //want to chat with flat
        let matchprofile = userprofile.matches[profileId];
        let roomMates = Object.keys(matchprofile.roomMates);
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

        membershipUpdate[
            `/memberships/${userprofile.profileId}/${chatId}`
        ] = true;
        Object.keys(matchprofile.roomMates).forEach((userId) => {
            membershipUpdate[`/memberships/${userId}/${chatId}`] = true;
        });
    } else {
        //want to chat with user
        let matchprofile =
            getState().flatprofileState.flatprofile.matches[profileId];
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

        membershipUpdate[`/memberships/${profileId}/${chatId}`] = true;

        Object.keys(flatprofile.roomMates).forEach((userId) => {
            membershipUpdate[`/memberships/${userId}/${chatId}`] = true;
        });
    }

    chatUpdate[`/chats/${chatId}`] = chatInfo;
    chatUpdate[`/messages/${chatId}/${firstMessageId}`] = {
        _id: firstMessageId,
        text: userprofile.firstName + ' ' + en.chat.startedChat,
        createdAt: new Date().getTime(),
        user: {
            _id: userprofile.profileId,
            name: userprofile.firstName + ' ' + userprofile.lastName,
        },
        system: true,
    };
    chatInfo['lastMessage'] = userprofile.firstName + ' ' + en.chat.startedChat;
    update(ref(database), membershipUpdate)
        .then(() => {
            update(ref(database), chatUpdate).then(
                dispatch({
                    type: Constants.CREATE_CHAT_SUCCESS,
                })
            );
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
        ref(database, `/memberships/${getState().authState.auth.uid}/${chatId}`)
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
