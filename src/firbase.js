// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBPBQc97fei1lYeLwG0lTTzrpTSf90zLaM",
  authDomain: "todo-machine-test.firebaseapp.com",
  projectId: "todo-machine-test",
  storageBucket: "todo-machine-test.appspot.com",
  messagingSenderId: "170709743729",
  appId: "1:170709743729:web:b3fdb41f5480ef1ed843d0",
  measurementId: "G-8C4ECWBDV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export{auth, provider}