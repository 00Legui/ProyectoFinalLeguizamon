import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// const firebaseConfig = {
//    apiKey: "AIzaSyDdkTC9uL5sVhlkeIwJu_w32Id1gy5O5Ts",
//    authDomain: "proyecto-final-5b995.firebaseapp.com",
//    projectId: "proyecto-final-5b995",
//    storageBucket: "proyecto-final-5b995.firebasestorage.app",
//    messagingSenderId: "1030013564181",
//    appId: "1:1030013564181:web:1822f464a0cece9cd0251c",
//    measurementId: "G-QMXP4QF16R"
//  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);