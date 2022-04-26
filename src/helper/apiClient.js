import axios from 'axios';
import Constants from 'expo-constants';
import { auth } from '../../firebase/firebase-config';

const API_URL = (_env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
        //return 'https://7be152d7-f460-4216-9386-295f88a99e3b.mock.pstmn.io';
    } else {
        return 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
    }
};

async function userToken() {
    const user = auth.currentUser;
    if (user) {
        return user.getIdToken();
    } else {
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
