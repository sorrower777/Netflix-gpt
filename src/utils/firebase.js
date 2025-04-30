// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtaaeYlhlUIWSkGDTyOvMx7n1R-HmYjo8",
  authDomain: "netflixgpt-c1988.firebaseapp.com",
  projectId: "netflixgpt-c1988",
  storageBucket: "netflixgpt-c1988.firebasestorage.app",
  messagingSenderId: "908355240588",
  appId: "1:908355240588:web:ea4816379fff34b6c7f1a9",
  measurementId: "G-XKZS5YH22L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); // Make sure to pass the app instance
