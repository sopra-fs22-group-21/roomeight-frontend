import apiClient from '../../helper/apiClient';
import {
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
} from '../constants';

const getUserProfilesRequest = () => ({
    type: GET_USERS_REQUEST,
});

const getUserProfilesSuccess = (userProfiles) => ({
    type: GET_USERS_SUCCESS,
    payload: userProfiles,
});

const getUserProfilesFailure = (error) => ({
    type: GET_USERS_FAILURE,
    payload: error,
});

/**
 * to be done!
 * @returns
 */
export const getUserProfiles = () => (dispatch) => {
    dispatch(getUserProfilesRequest());

    apiClient()
        .get('/userprofiles')
        .then((response) => {
            dispatch(getUserProfilesSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getUserProfilesFailure(error));
        });
};
