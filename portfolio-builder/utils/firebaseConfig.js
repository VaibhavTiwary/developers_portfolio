// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: "projects69.firebaseapp.com",
    projectId: "projects69",
    storageBucket: "projects69.appspot.com",
    messagingSenderId: "485179899219",
    appId: "1:485179899219:web:48ce6178acfbd8f6cf75a6",
    measurementId: "G-KNS3W0KJNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);