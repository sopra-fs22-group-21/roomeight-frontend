import * as Constants from '../constants';

const initialState = {
    chats: null,
    messages: {},
    memberships: null,
};

const chatState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.CHAT_MEMBERSHIP_CHANGE:
            return {
                ...state,
                memberships: {
                    ...state.memberships,
                    [action.payload]: true,
                },
            };

        case Constants.CHAT_INFO_CHANGE:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload._id]: action.payload,
                },
            };
        case Constants.NEW_CHAT_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: {
                        ...state.messages[action.payload.chatId],
                        [action.payload.messages._id]: action.payload.messages,
                    },
                },
            };
        case Constants.LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: action.payload.messages,
                },
            };

        default:
            return state;
    }
};

export default chatState;
