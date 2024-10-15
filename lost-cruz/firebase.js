// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import fireConfig from './fireConfig.json'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: fireConfig.apiKey,
    authDomain: fireConfig.authDomain,
    projectId: fireConfig.projectId,
    storageBucket: fireConfig.storageBucket,
    messagingSenderId: fireConfig.messagingSenderId,
    appId: fireConfig.appId,
    measurementId: fireConfig.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
