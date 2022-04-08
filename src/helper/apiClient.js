import axios from 'axios';
import Constants from 'expo-constants';
import { CombinedState } from 'redux';
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';

const API_URL = (env = Constants.manifest.releaseChannel) => {
    /* if (env === __DEV__) {
        console.log('dev');
        return 'https://b8585bf5-1579-433d-aec8-d6ad6bdfb349.mock.pstmn.io';
    } else {
        console.log('prod');
        return 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
    } */

    return 'https://b8585bf5-1579-433d-aec8-d6ad6bdfb349.mock.pstmn.io';
};

async function userToken(){
    const user = auth.currentUser;
    if (user) {
        console.log("logged in");
        const token = await user.getIdToken()
        return token;
    }else{
        console.log("no user")
        return null;
    }
};

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
