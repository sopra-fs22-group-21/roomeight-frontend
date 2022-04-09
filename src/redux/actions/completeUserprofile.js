import {
    COMPLETE_USERPROFILE_REQUEST,
    COMPLETE_USERPROFILE_SUCCESS,
    COMPLETE_USERPROFILE_FAILURE,
} from '../constants';
import apiClient from '../../helper/apiClient';

const completeUserprofileRequest = () => ({
    type: COMPLETE_USERPROFILE_REQUEST,
});

const completeUserprofileSuccess = (userprofile) => ({
    type: COMPLETE_USERPROFILE_SUCCESS,
    payload: userprofile,
});

const completeUserprofileFailure = (error) => ({
    type: COMPLETE_USERPROFILE_FAILURE,
    payload: error,
});

export const completeUserprofile = (userprofile) => (dispatch) => {
    dispatch(completeUserprofileRequest());

    apiClient()
        .put('/userprofiles', userprofile)
        .then((response) => {
            console.log(
                'completeUserprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(completeUserprofileSuccess(response.data));
        })
        .catch((error) => {
            console.log('error put userprofile');
            dispatch(completeUserprofileFailure(error));
        });
};
