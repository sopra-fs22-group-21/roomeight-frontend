import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOADING_STATE,
} from '../constants';
import { auth } from '../../../firebase/firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { logoutUserSuccess } from './logoutUser';

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

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
        dispatch(loginUserFailure(error));
    });
};

export const userAuthStateListener = () => (dispatch) => {
    dispatch({
        type: LOADING_STATE,
    });
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //user is logged in
            dispatch(loginUserSuccess(user));
        } else {
            //no user logged in
            dispatch(logoutUserSuccess());
        }
    });
};
