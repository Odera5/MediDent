import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN_8j5-Ykjwm9L_HwyMiBcd58aEbf9byE",
  authDomain: "medident-56d93.firebaseapp.com",
  projectId: "medident-56d93",
  storageBucket: "medident-56d93.firebasestorage.app", // 👈 matches your bucket
  messagingSenderId: "610472175855",
  appId: "1:610472175855:web:28b2889de220d8461d931a",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
