import axios from 'axios';

const apiClient = () => {
    const API_URL = 'https://us-central1-roomeight-9cd94.cloudfunctions.net';
    const DEV_URL = 'https://b8585bf5-1579-433d-aec8-d6ad6bdfb349.mock.pstmn.io';

    const axiosInstance = axios.create({
        baseURL: DEV_URL,
        headers: {
            "crossOrigin":true,
            "Access-Control-Allow-Origin": "*",
        },
        responseType: 'json',
    });
    return axiosInstance;
}

export default apiClient;