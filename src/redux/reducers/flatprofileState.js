import * as Constants from '../constants';
import Flatprofile from '../../models/Flatprofile';

const initialState = {
    flatprofile: {},
};

const flatprofileState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_FLATPROFILE_SUCCESS:
            return {
                ...state,
                flatprofile: new Flatprofile(action.payload),
            };
        case Constants.POST_FLATPROFILE_SUCCESS:
            return {
                ...state,
                flatprofile: new Flatprofile(action.payload),
            };

        case Constants.POST_LIKE_USER_SUCCESS:
            return {
                ...state,
                //todo: flatprofile: action.payload.updatedFlatProfile,
            };
        default:
            return state;
    }
};
export default flatprofileState;
