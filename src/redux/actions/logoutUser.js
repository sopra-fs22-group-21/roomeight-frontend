import {
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
} from '../constants';
import { auth } from '../../../firebase/firebase-config';
import { signOut } from 'firebase/auth';

const logoutUserRequest = () => ({
    type: LOGOUT_USER_REQUEST,
});

export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS,
});

const logoutUserFailure = (error) => ({
    type: LOGOUT_USER_FAILURE,
    payload: error,
});

export const logoutUser = () => (dispatch) => {
    dispatch(logoutUserRequest());

    signOut(auth).catch((error) => {
        dispatch(logoutUserFailure(error));
    });
};
