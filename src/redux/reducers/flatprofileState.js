import * as Constants from '../constants';

const initialState = {
    flatprofile: {},
};

const flatprofileState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.POST_FLATPROFILE_SUCCESS:
            return {
                ...state,
                flatprofile: action.payload,
            };

        default:
            return state;
    }
};
export default flatprofileState;
