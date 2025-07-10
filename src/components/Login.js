
import React from "react"; //importing React from react;
import Header from "./Header.js";
import { useState , useRef} from "react";
import { checkValidateData } from "../utils/validate.js";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { updateProfile } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice.js";
import { useDispatch } from "react-redux";
import { UserAvatar } from "../utils/constant.js";

const Login = () => {
  const[isSignInForm , setSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);
  // const navigate = useNavigate();
  const[name , setName] = useState(""); 
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    try {
      // Validate the form data    
      const message = checkValidateData(email.current.value, password.current.value);
      setErrorMessage(message);
      if(message) return;
      
      // Show loading state
      setErrorMessage("Processing request...");
      
      if(!isSignInForm){
        // Sign Up logic
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            email.current.value, 
            password.current.value
          );
          // Signed up 
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: name, 
            photoURL: UserAvatar
          });
          // After profile is updated
          const {uid, email: userEmail, displayName, photoURL} = auth.currentUser;
          dispatch(
            addUser({
              uid: uid, 
              email: userEmail, 
              displayName: displayName, 
              photoURL: photoURL
            })
          );
          console.log("Successfully signed up:", user);
          setErrorMessage(null);
          // navigate("/browse"); // Navigation happens here
        } catch (error) {
          console.error("Firebase signup error:", error);
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Email already in use. Try signing in instead.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Invalid email format.");
          } else if (error.code === "auth/weak-password") {
            setErrorMessage("Password is too weak. Use at least 6 characters.");
          } else {
            setErrorMessage(error.code + " - " + error.message);
          }
        }
      } else {
        // Sign In logic

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          // Signed in
          const user = userCredential.user;
          console.log("Successfully signed in:", user);
          setErrorMessage(null);
          // Make sure navigation happens here
          // navigate("/browse");
        } catch (error) {
          console.error("Firebase signin error:", error);
          if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            setErrorMessage("Invalid email or password.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Invalid email format.");
          } else {
            setErrorMessage(error.code + " - " + error.message);
          }
        }
      }
    } catch (error) {
      console.error("General error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);

  };
  const handleChange = (e) =>{
    setName(e.target.value);
  }
    return (
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        {/* Background with overlay - FIXED VERSION */}
        <div className="fixed inset-0 -z-10 h-screen w-full">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg"
            alt="Netflix background"
            className="absolute h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'; // Hide if fails to load
            }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
          <Header />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <form onSubmit={(e)=>e.preventDefault()}
         className="w-full max-w-md p-12 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 rounded-md"
        >
          <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          
          <div className="space-y-4">
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
              value={name}
              onChange={handleChange}
            />
          )}
            <input
            ref={email}
              type="email"
              placeholder="Email or phone number"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
            ref={password}
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          {/* <p className="text-red-500 font-bold text-lg py-2">{name}</p> */}
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button
            type="submit"
            className="w-full py-3 mt-8 text-white bg-red-600 rounded-md hover:bg-red-700 font-medium"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-white py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm? 
            "New to Netflix? Sign Up Now." :
             "Already have an account? Sign In Now."}
             </p>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
