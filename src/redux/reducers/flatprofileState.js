import Flatprofile from '../../models/Flatprofile';
import * as Constants from '../constants';

const initialState = {
    flatprofile: {},
    loading: false,
};

const flatprofileState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_FLATPROFILE_REQUEST:
        case Constants.UPDATE_FLATPROFILE_REQUEST:
        case Constants.POST_FLATPROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_FLATPROFILE_SUCCESS:
        case Constants.UPDATE_FLATPROFILE_SUCCESS:
        case Constants.POST_FLATPROFILE_SUCCESS:
            return {
                ...state,
                flatprofile: new Flatprofile(action.payload),
                loading: false,
            };
        case Constants.GET_FLATPROFILE_FAILURE:
        case Constants.UDPATE_FLATPROFILE_FAILURE:
        case Constants.POST_FLATPROFILE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default flatprofileState;
