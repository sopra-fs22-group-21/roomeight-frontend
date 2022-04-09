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
            dispatch(postUserprofileSuccess(response.data));
        })
        .catch((error) => {
            dispatch(postUserprofileFailure(error));
        })
        //TODO: handle login after signup why doesnt this work??
        /* .finally(() => {
            console.log("finally")
            dispatch(loginUser(userprofile.email, userprofile.password));
        }); */
};
