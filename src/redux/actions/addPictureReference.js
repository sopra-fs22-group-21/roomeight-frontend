import { ADD_PICTURE_REFERENCE } from '../constants';

export const addPictureReference = (uri) => ({
    type: ADD_PICTURE_REFERENCE,
    payload: uri,
});
