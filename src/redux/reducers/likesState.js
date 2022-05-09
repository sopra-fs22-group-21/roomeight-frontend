import * as Constants from '../constants';

const initialState = {
    likes: [],
    loading: true,
};

//TODO: error handling -> really set to null on every success?
/**
 * reducer for the userprofile state
 *
 * @param {object} initialState
 * @param {reduxAction} action action that got dispatched
 */
const likesState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_FLATPROFILE_SUCCESS:
            return {
                ...state,
                likes: action.payload.likes.filter(
                    (like) =>
                        !Object.keys(action.payload.matches).includes(like)
                ),
                loading: false,
            };
        default:
            return state;
    }
};
export default likesState;
