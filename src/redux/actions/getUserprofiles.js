import apiClient from '../../helper/apiClient';
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
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
