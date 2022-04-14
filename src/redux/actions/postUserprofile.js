import {
    POST_USERPROFILE_REQUEST,
    POST_USERPROFILE_SUCCESS,
    POST_USERPROFILE_FAILURE,
} from '../constants';
import apiClient from '../../helper/apiClient';
import { loginUser, userAuthStateListener } from './loginUser';

const postUserprofileRequest = () => ({
    type: POST_USERPROFILE_REQUEST,
});

const postUserprofileSuccess = (userprofile) => ({
    type: POST_USERPROFILE_SUCCESS,
    payload: userprofile,
});

const postUserprofileFailure = (error) => ({
    type: POST_USERPROFILE_FAILURE,
    payload: error,
});

export const postUserprofile = (userprofile) => (dispatch) => {
    dispatch(postUserprofileRequest());

    apiClient()
        .post('/userprofiles', userprofile)
        .then((response) => {
            console.log(
                'postUserprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(postUserprofileSuccess(response.data));
        })
        .then(() => {
            console.log('then logging in...');
            dispatch(loginUser(userprofile.email, userprofile.password));
        })
        .catch((error) => {
            console.log('error posting userprofile');
            console.log(error.message);
            console.log(userprofile);
            dispatch(postUserprofileFailure(error));
        });
};
