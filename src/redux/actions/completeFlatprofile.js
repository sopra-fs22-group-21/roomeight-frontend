import {
    COMPLETE_FLATPROFILE_REQUEST,
    COMPLETE_FLATPROFILE_SUCCESS,
    COMPLETE_FLATPROFILE_FAILURE,
} from '../constants';
import apiClient from '../../helper/apiClient';

const completeFlatprofileRequest = () => ({
    type: COMPLETE_FLATPROFILE_REQUEST,
});

const completeFlatprofileSuccess = (userprofile) => ({
    type: COMPLETE_FLATPROFILE_SUCCESS,
    payload: userprofile,
});

const completeFlatprofileFailure = (error) => ({
    type: COMPLETE_FLATPROFILE_FAILURE,
    payload: error,
});

export const completeFlatprofile = (userprofile) => (dispatch) => {
    dispatch(completeFlatprofileRequest());

    apiClient()
        .put('/flatprofiles', flatprofile)
        .then((response) => {
            console.log(
                'completeFlatprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(completeFlatprofileSuccess(response.data));
        })
        .catch((error) => {
            console.log('error put flatprofile');
            dispatch(completeFlatprofileFailure(error));
        });
};
