// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Use environment variables if available, otherwise use demo config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:demo",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-DEMO",
};

// Initialize Firebase only if we have valid configuration
let app = null;
let auth = null;

try {
  // Only initialize if we have a real API key (not demo)
  if (firebaseConfig.apiKey !== "demo-api-key") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    // Only initialize analytics in production
    if (process.env.NODE_ENV === 'production' && firebaseConfig.measurementId !== "G-DEMO") {
      getAnalytics(app);
    }
  }
} catch (error) {
  console.warn("Firebase initialization failed:", error.message);
  console.warn("App will run without authentication features");
}

export { auth };
