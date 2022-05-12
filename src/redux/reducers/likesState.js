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

//TODO: only write in likes state if user has also liked flat back

const likesState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_FLATPROFILE_SUCCESS:
            return {
                ...state,
                likes: action.payload.likes.filter((like) => {
                    console.log(Object.keys(action.payload.matches));
                    console.log(Object.keys(like.likedUser)[0]);
                    return !Object.keys(action.payload.matches).includes(
                        Object.keys(like.likedUser)[0]
                    );
                }),
                loading: false,
            };
        default:
            return state;
    }
};
export default likesState;
