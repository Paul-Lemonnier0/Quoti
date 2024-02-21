// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMWW7PsCIguunKM52_ipIzf0PzWS9rWYc",
  authDomain: "goodhabits-33fa2.firebaseapp.com",
  projectId: "goodhabits-33fa2",
  storageBucket: "goodhabits-33fa2.appspot.com",
  messagingSenderId: "781893204018",
  appId: "1:781893204018:web:7941fe09c28112d89da42b",
  measurementId: "G-9GL5LM05E3",
  databaseURL: "https://goodhabits-33fa2-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app, db, database, auth}