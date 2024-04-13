// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGmCZW1Z9tYyoK15qFWEmntmhVTuMcevU",
  authDomain: "quoti-b83a0.firebaseapp.com",
  databaseURL: "https://quoti-b83a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quoti-b83a0",
  storageBucket: "quoti-b83a0.appspot.com",
  messagingSenderId: "508203230676",
  appId: "1:508203230676:web:ab9eff443a6ddea51fe241",
  measurementId: "G-TL625R7T19"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app, db, database, auth}