import * as Constants from '../constants';

const initialState = {
    chats: {},
    messages: {},
};

const chatState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CHAT_MEMBERSHIP_CHANGE:
            return {
                ...state,
                chats: action.payload,
            };

        case Constants.CHAT_INFO_CHANGE:
            state.chats[action.payload.chatid] = action.payload.chat;
            return {
                ...state,
            };
        case Constants.CHAT_MESSAGES_CHANGE:
            //state.messages[action.payload.chatid] = action.payload.messages;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatid]: {
                        ...state.messages[action.payload.chatid],
                        ...action.payload.messages,
                    },
                },
            };
        case Constants.SEND_MESSAGE_SUCCESS:
            state.messages[action.payload.chatid][action.payload.messageid] =
                action.payload.message;
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default chatState;
