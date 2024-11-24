import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAH0JqjKdXV9haa_53S6Vim6n4l-F39IyI",
  authDomain: "hirakata-b5588.firebaseapp.com",
  projectId: "hirakata-b5588",
  storageBucket: "hirakata-b5588.firebasestorage.app",
  messagingSenderId: "925390938070",
  appId: "1:925390938070:web:5c34519f463eb76ef64e77",
  measurementId: "G-H3R8MXT8KL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);