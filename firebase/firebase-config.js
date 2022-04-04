// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: 'AIzaSyAositsGqxjNyb3MU2d9AcoDzpScSYuRCU',
    authDomain: 'roomeight-9cd94.firebaseapp.com',
    projectId: 'roomeight-9cd94',
    storageBucket: 'roomeight-9cd94.appspot.com',
    messagingSenderId: '1058508184922',
    appId: '1:1058508184922:web:5ccc00f77f6630f23f2763',
    measurementId: 'G-7QE2XWF09M',
};

//Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// export analytics
export const analytics = getAnalytics(firebaseApp);
// export auth
export const auth = getAuth(firebaseApp);
