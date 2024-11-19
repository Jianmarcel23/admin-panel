// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG-HuAKLayPXUVrk5LR8Ok5xN2Iz7HM5c",
  authDomain: "djbc-30a88.firebaseapp.com",
  projectId: "djbc-30a88",
  storageBucket: "djbc-30a88.appspot.com",
  messagingSenderId: "621097076279",
  appId: "1:621097076279:web:df34257a34a62e7083a1b2",
  measurementId: "G-MBKGWFWENH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
