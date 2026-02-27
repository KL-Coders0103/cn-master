import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvttAiVRYQTz3rRt92gR72OhTtWylZ9PE",
  authDomain: "cn-master-7f46f.firebaseapp.com",
  projectId: "cn-master-7f46f",
  storageBucket: "cn-master-7f46f.firebasestorage.app",
  messagingSenderId: "466266702867",
  appId: "1:466266702867:web:18ba5d93d294954039ebe6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);