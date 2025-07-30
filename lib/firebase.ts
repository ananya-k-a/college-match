// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7suRPSAhQPYSk9RKYjn-HthDKfmop6UU",
  authDomain: "college-finder-3ccae.firebaseapp.com",
  projectId: "college-finder-3ccae",
  storageBucket: "college-finder-3ccae.appspot.com",
  messagingSenderId: "381318908090",
  appId: "1:381318908090:web:f08ca7524190472ca1da83"
};

// Prevent re-initialization during hot reloads
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
