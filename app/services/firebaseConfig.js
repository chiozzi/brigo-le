// services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPUW_lHNxRahATQ1BBplLG5p95xSs5Bjs",
  authDomain: "brigo-le.firebaseapp.com",
  projectId: "brigo-le",
  storageBucket: "brigo-le.firebasestorage.app",
  messagingSenderId: "693192376488",
  appId: "1:693192376488:web:0469e189c75c3c4d4bc29d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
