import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = (env = Constants.manifest.releaseChannel) => {
    if (env === __DEV__) {
        return 'https://b8585bf5-1579-433d-aec8-d6ad6bdfb349.mock.pstmn.io';
    } else {
        return 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
    }
};

const apiClient = () => {
    /* const API_URL = 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
    const DEV_URL =
        'https://b8585bf5-1579-433d-aec8-d6ad6bdfb349.mock.pstmn.io'; */

    const axiosInstance = axios.create({
        baseURL: API_URL,
        responseType: 'json',
    });
    return axiosInstance;
};

export default apiClient;
