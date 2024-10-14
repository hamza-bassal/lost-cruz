// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhtN_1ln0xVtZR1pc6-45gI3ZviIYeqjI",
  authDomain: "lostatcruz.firebaseapp.com",
  databaseURL: "https://lostatcruz-default-rtdb.firebaseio.com",
  projectId: "lostatcruz",
  storageBucket: "lostatcruz.appspot.com",
  messagingSenderId: "836319329188",
  appId: "1:836319329188:web:20ec96d39f09a057ed9f31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;