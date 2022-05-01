import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import * as Constants from '../constants';
import { getCurrentUserprofile } from './getUserprofiles';
import { chatMemberShipListener } from './chatActions';

// intermediary actions for redux

const loginUserRequest = () => ({
    type: Constants.LOGIN_USER_REQUEST,
});

const loginUserSuccess = (user) => ({
    type: Constants.LOGIN_USER_SUCCESS,
    payload: user,
});

const loginUserFailure = (error) => ({
    type: Constants.LOGIN_USER_FAILURE,
    payload: error,
});

const logoutUserRequest = () => ({
    type: Constants.LOGOUT_USER_REQUEST,
});

const logoutUserSuccess = () => ({
    type: Constants.LOGOUT_USER_SUCCESS,
});

const logoutUserFailure = (error) => ({
    type: Constants.LOGOUT_USER_FAILURE,
    payload: error,
});

/**
 * Login a user with email and password through firebase authentication
 * @param {String} email
 * @param {String} password
 * @dispatches {@link loginUserRequest} if login is requested
 * @dispatches {@link loginUserFailure} with error payload if login fails
 */
export const loginUser = (email, password) => (dispatch) => {
    dispatch(loginUserRequest());

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
        dispatch(loginUserFailure(error));
    });
};

/**
 * authStateListener that reacts on auth changes and dispatches necessary actions
 * @dispatches {@link logoutUserSuccess} with auth object payload if user is logged out
 * @dispatches {@link loginUserSuccess} if user is logged in
 */
export const userAuthStateListener = () => (dispatch) => {
    dispatch({
        type: Constants.LOADING_STATE,
    });
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //user is logged in
            console.log('logged in');
            dispatch(loginUserSuccess(user));
            dispatch(getCurrentUserprofile());
            dispatch(chatMemberShipListener());
        } else {
            //no user logged in
            dispatch(logoutUserSuccess());
        }
    });
};

/**
 * logs a user out from firebase authentication
 * @dispatches {@link logoutUserRequest} if logout is requested
 * @dispatches {@link logoutUserFailure} with error payload if logout fails
 * @see {@link userAuthStateListener} reacts if logout is successful
 */
export const logoutUser = () => (dispatch) => {
    dispatch(logoutUserRequest());

    signOut(auth).catch((error) => {
        dispatch(logoutUserFailure(error));
    });
};
