import * as Notifications from 'expo-notifications';
import { onChildChanged, ref } from 'firebase/database';
import { AppState } from 'react-native';
import { database } from '../../../firebase/firebase-config';
import * as Constants from '../constants';
import { getCurrentUserprofile } from './getUserprofiles';

/**
 * Listens to the changes in the database for new likes and new matches
 * @dispatches {@link Constants.MATCHES_AND_LIKES_LISTENER_SUCCESS} on listener start
 * @dispatches {@link Constants.NEW_MATCH} if a new match is generated
 * @dispatches {@link Constants.NEW_LIKE} if a new like is generated
 */
export const matchesAndLikesListener = () => (dispatch, getState) => {
    dispatch({
        type: Constants.MATCHES_AND_LIKES_LISTENER_STARTED,
    });
    const isSearching = getState().userprofileState.userprofile.isSearchingRoom;
    if (isSearching) {
        const uid = getState().authState.auth.uid;
        const changesReference = ref(database, `/changes/${uid}`);
        onChildChanged(changesReference, (snapshot) => {
            if (!snapshot.exists()) return;
            if (snapshot.key === 'newestMatch') {
                dispatch({
                    type: Constants.NEW_MATCH,
                    payload: snapshot.val(),
                });
                dispatch(getCurrentUserprofile());
            } else if (snapshot.key === 'newestLike') {
                dispatch({
                    type: Constants.NEW_LIKE,
                    payload: snapshot.val(),
                });
                dispatch(getCurrentUserprofile());
            }
        });
    } else {
        const flatId = getState().userprofileState.userprofile.flatId;
        const changesReference = ref(database, `/changes/${flatId}`);
        onChildChanged(changesReference, (snapshot) => {
            if (snapshot.key() === 'newestMatch') {
                dispatch({
                    type: Constants.NEW_MATCH,
                    payload: snapshot.val(),
                });
                dispatch(getCurrentUserprofile());
            } else if (snapshot.key() === 'newestLike') {
                dispatch({
                    type: Constants.NEW_LIKE,
                    payload: snapshot.val(),
                });
                dispatch(getCurrentUserprofile());
            }
        });
    }
};

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
            console.log(data);
            if (data.type === 'NEW_LIKE') {
                dispatch({
                    type: Constants.NEW_LIKE,
                    payload: data.profile,
                });
            } else if (data.type === 'NEW_MATCH') {
                dispatch({
                    type: Constants.NEW_MATCH,
                    payload: data.profile,
                });
            }
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
                        payload: data.profile,
                    });
                } else if (data.type === 'NEW_MATCH') {
                    dispatch({
                        type: Constants.NEW_MATCH,
                        payload: data.profile,
                    });
                }
            }
        }
    );
};
