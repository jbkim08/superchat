import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'superchat-jbkim.firebaseapp.com',
  projectId: 'superchat-jbkim',
  storageBucket: 'superchat-jbkim.appspot.com',
  messagingSenderId: '737866606655',
  appId: '1:737866606655:web:cb1de7d4922c276342f08a',
};
//파이어베이스 초기화
const app = initializeApp(firebaseConfig);
//구글인증과 파이어스토어DB
const auth = getAuth();
const googleAuth = new GoogleAuthProvider();
const db = getFirestore();

export { auth, googleAuth, db };
