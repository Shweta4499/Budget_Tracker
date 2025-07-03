// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA7d_jH1HBtxlM8-fie4PWrSvulMBukkg",
  authDomain: "budget-tracker-260a1.firebaseapp.com",
  projectId: "budget-tracker-260a1",
  storageBucket: "budget-tracker-260a1.firebasestorage.app",
  messagingSenderId: "538274857372",
  appId: "1:538274857372:web:63bddd12bb5dafa827c859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}