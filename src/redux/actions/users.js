import { USER } from '..constants';

export function changeUser(user) {
    return {
        type: USER,
        payload: user
    }
}
    