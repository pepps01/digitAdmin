// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAH_wyE4uP-V15LjQNyYE7xotVExl-EFDE",
  authDomain: "cue-rider.firebaseapp.com",
  projectId: "cue-rider",
  storageBucket: "cue-rider.appspot.com",
  messagingSenderId: "55552955289",
  appId: "1:55552955289:web:b7109b51bf75b118707908",
  measurementId: "G-3G24ZJE32H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
