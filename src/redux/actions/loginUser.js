import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from '../constants';
import { auth } from '../../../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

const loginUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error,
});

export const loginUser = (email, password) => (dispatch) => {
    dispatch(loginUserRequest());

    signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            dispatch(loginUserSuccess(response.user));
        })
        .catch((error) => {
            dispatch(loginUserFailure(error));
        });
};
