import { USER_STATE_CHANGE } from "../constants";
import { GET_USERS, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from "../constants";

const initialState = {
    userProfiles: [],
    loading: true,
    error: null,
}

const userProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                userProfiles: action.payload,
                loading: false,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                userProfiles: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default userProfilesReducer;