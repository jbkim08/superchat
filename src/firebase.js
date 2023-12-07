import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'superchat-jbkim.firebaseapp.com',
  projectId: 'superchat-jbkim',
  storageBucket: 'superchat-jbkim.appspot.com',
  messagingSenderId: '737866606655',
  appId: '1:737866606655:web:cb1de7d4922c276342f08a',
};

const app = initializeApp(firebaseConfig);
