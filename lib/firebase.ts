// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7suRPSAhQPYSk9RKYjn-HthDKfmop6UU",
  authDomain: "college-finder-3ccae.firebaseapp.com",
  projectId: "college-finder-3ccae",
  storageBucket: "college-finder-3ccae.appspot.com",
  messagingSenderId: "381318908090",
  appId: "1:381318908090:web:f08ca7524190472ca1da83"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
