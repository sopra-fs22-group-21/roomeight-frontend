import apiClient from '../../helper/apiClient';
import {
    COMPLETE_FLATPROFILE_FAILURE,
    COMPLETE_FLATPROFILE_REQUEST,
    COMPLETE_FLATPROFILE_SUCCESS,
} from '../constants';

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

/**
 * to be done!
 * @param {*} userprofile
 * @returns
 */
export const completeFlatprofile = (flatprofile) => (dispatch) => {
    dispatch(completeFlatprofileRequest());

    apiClient()
        .patch('/flatprofiles', flatprofile)
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
