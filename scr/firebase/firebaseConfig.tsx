// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs423Uyap-sbNdAXoZub2_z9pNd7dHlrc",
  authDomain: "anleneentry.firebaseapp.com",
  projectId: "anleneentry",
  storageBucket: "anleneentry.appspot.com",
  messagingSenderId: "547227698725",
  appId: "1:547227698725:web:c8bc584f5b56336e6221cc",
  measurementId: "G-76Q80ZH7T2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);
export const DATABASE = getDatabase(FIREBASE_APP);
export const STORAGE = getStorage(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);