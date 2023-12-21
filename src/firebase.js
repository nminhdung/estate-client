// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-a9dee.firebaseapp.com',
  projectId: 'mern-estate-a9dee',
  storageBucket: 'mern-estate-a9dee.appspot.com',
  messagingSenderId: '43904966055',
  appId: '1:43904966055:web:3fdb212bb8cbb3305fea82'
};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);