// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjMAZplt84fwOU7tiSuszrETOpuFbOjBw",
  authDomain: "tatas-restaurant.firebaseapp.com",
  projectId: "tatas-restaurant",
  storageBucket: "tatas-restaurant.appspot.com",
  messagingSenderId: "563830442972",
  appId: "1:563830442972:web:81d51144bbcf6c8ed85d19",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Enable offline persistence
initializeFirestore(app, {
  localCache: persistentLocalCache(/*settings*/ {}),
  experimentalForceLongPolling: true, // Optional: if you experience connection issues
});

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
