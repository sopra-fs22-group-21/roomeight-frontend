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
        case Constants.POST_LEAVE_FLAT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_FLATPROFILE_SUCCESS:
        case Constants.UPDATE_FLATPROFILE_SUCCESS:
        case Constants.POST_FLATPROFILE_SUCCESS:
            console.log('got ' + action.type);
            console.log('loading flatprofile');
            return {
                ...state,
                flatprofile: new Flatprofile(action.payload),
                loading: false,
            };
        case Constants.GET_FLATPROFILE_FAILURE:
        case Constants.UDPATE_FLATPROFILE_FAILURE:
        case Constants.POST_FLATPROFILE_FAILURE:
        case Constants.POST_LEAVE_FLAT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case Constants.POST_LEAVE_FLAT_SUCCESS:
            return {
                flatprofile: {},
                loading: false,
            };
        default:
            return state;
    }
};
export default flatprofileState;
