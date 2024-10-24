// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVPK5FNWoCubakzeF-aeVbwpVq6Jwp5Yk",
  authDomain: "shoppinglistapp-58acf.firebaseapp.com",
  projectId: "shoppinglistapp-58acf",
  storageBucket: "shoppinglistapp-58acf.appspot.com",
  messagingSenderId: "739836359274",
  appId: "1:739836359274:web:c0db649411b2f2d6d21013",
  measurementId: "G-GX9EXRY8GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Eksportér Firestore-databasen

