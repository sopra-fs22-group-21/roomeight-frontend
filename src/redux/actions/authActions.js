import * as Notifications from 'expo-notifications';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import { registerForPushNotificationsAsync } from '../../helper/notificationsHelper';
import * as Constants from '../constants';
import { chatMemberShipListener } from './chatActions';
import { getCurrentUserprofile } from './getUserprofiles';
import { notificationsListener } from './notificationActions';
import { deletePushToken, postPushToken } from './updateActions';

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
 * @dispatches {@link postPushToken} to register the device for notifications in the backend
 * @dispatches {@link loginUserFailure} with error payload if login fails
 */
export const loginUser = (email, password) => async (dispatch) => {
    dispatch(loginUserRequest());
    try {
        await signInWithEmailAndPassword(auth, email, password);
        await dispatch(postPushToken());
    } catch (error) {
        dispatch(loginUserFailure(error));
    }
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
            dispatch(loginUserSuccess(user));
            dispatch(getCurrentUserprofile());
            dispatch(chatMemberShipListener());
            dispatch(notificationsListener());
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
 * @dispatches {@link deletePushToken} to deregister the device for notifications in the backend
 * @see {@link userAuthStateListener} reacts if logout is successful
 */
export const logoutUser = () => async (dispatch) => {
    dispatch(logoutUserRequest());
    await dispatch(deletePushToken());

    signOut(auth).catch((error) => {
        dispatch(logoutUserFailure(error));
    });
};
