import { onChildChanged, ref } from 'firebase/database';
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
