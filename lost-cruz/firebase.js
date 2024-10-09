// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWfYmdxbGau2WSNXt368aIqMyr8f8e4o4",
    authDomain: "pantry-02.firebaseapp.com",
    projectId: "pantry-02",
    storageBucket: "pantry-02.appspot.com",
    messagingSenderId: "552693894113",
    appId: "1:552693894113:web:b44a2554f22e6c4a12e0a0",
    measurementId: "G-2BG0JXGM2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };