import axios from 'axios';
import Constants from 'expo-constants';
import { auth } from '../../firebase/firebase-config';

const API_URL = (_env = Constants.manifest.releaseChannel) => {
    /* if (__DEV__) {
        return 'https://343bc70e-4abf-4c78-abec-b25b6f4f34e9.mock.pstmn.io';
    } else { */
    return 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
    //}
};

async function userToken() {
    const user = auth.currentUser;
    if (user) {
        console.log('logged in');
        return user.getIdToken();
    } else {
        console.log('no user');
        return null;
    }
}

const apiClient = () => {
    const axiosInstance = axios.create({
        baseURL: API_URL(),
        responseType: 'json',
    });

    axiosInstance.interceptors.request.use(async (req) => {
        const accessToken = await userToken();
        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    });

    return axiosInstance;
};

export default apiClient;
