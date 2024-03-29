import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import * as Constants from '../constants';
import { getFlatprofile } from './getFlatprofiles';
import {
    getCurrentUserprofile,
    reloadCurrentUserprofile,
} from './getUserprofiles';

export const notificationsListener = () => (dispatch, getState) => {
    dispatch({
        type: Constants.NOTIFICATIONS_LISTENER_STARTED,
    });
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    const unsubF = Notifications.addNotificationReceivedListener(
        (notification) => {
            const { data } = notification.request.content;
            console.log(notification);
            if (data.type === 'NEW_LIKE') {
                dispatch({
                    type: Constants.NEW_LIKE,
                });
            } else if (data.type === 'NEW_MATCH') {
                dispatch({
                    type: Constants.NEW_MATCH,
                });
            } else if (data.type === 'ROOMMATE_LEFT_FLAT') {
                dispatch({
                    type: Constants.ROOMMATE_LEFT_FLAT,
                });
            } else if (data.type === 'ROOMMATE_JOINED_FLAT') {
                dispatch({
                    type: Constants.ROOMMATE_JOINED_FLAT,
                });
            }
            dispatch(getCurrentUserprofile());
        }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const unsub = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            const data = response?.notification.request.content.data;
            if (AppState.currentState !== 'active') {
                if (data.type === 'NEW_LIKE') {
                    dispatch({
                        type: Constants.NEW_LIKE,
                    });
                } else if (data.type === 'NEW_MATCH') {
                    dispatch({
                        type: Constants.NEW_MATCH,
                    });
                } else if (data.type === 'ROOMMATE_LEFT_FLAT') {
                    dispatch({
                        type: Constants.ROOMMATE_LEFT_FLAT,
                    });
                } else if (data.type === 'ROOMMATE_JOINED_FLAT') {
                    dispatch({
                        type: Constants.ROOMMATE_JOINED_FLAT,
                    });
                }
                if (getState().userprofileState.userprofile.isAdvertisingRoom)
                    dispatch(getFlatprofile());
                dispatch(getCurrentUserprofile());
            }
        }
    );
};
