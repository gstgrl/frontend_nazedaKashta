// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore (Database)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS533ylOM14anjOlQ3EuPJOM8fDZH_tJw",
  authDomain: "nazedakashta-bf01a.firebaseapp.com",
  projectId: "nazedakashta-bf01a",
  storageBucket: "nazedakashta-bf01a.firebasestorage.app",
  messagingSenderId: "4705289736",
  appId: "1:4705289736:web:9e4ae9393f4266d4ca33bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };