// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // --- 1. ADD THIS LINE ---

// Your specific Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVXqbY0FnW24rUM5U-gMEKAexp44DK9pw",
  authDomain: "task-manager-final-70f53.firebaseapp.com",
  projectId: "task-manager-final-70f53",
  storageBucket: "task-manager-final-70f53.firebasestorage.app",
  messagingSenderId: "190491911571",
  appId: "1:190491911571:web:c6571ea2d81aed23b37466",
  measurementId: "G-CZPGRZNTLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the database service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app); // --- 2. ADD THIS LINE ---

// Export both the database and auth services so they can be used in other files
export { db, auth }; // --- 3. UPDATE THIS LINE ---