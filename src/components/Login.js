
import React from "react";
import Header from "./Header.js";
import { useState } from "react";

const Login = () => {
  const[isSignInForm , setSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };
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
        <form className="w-full max-w-md p-12 bg-opacity-80 bg-black rounded-md">
          <h1 className="text-3xl font-bold text-white mb-8">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          
          <div className="space-y-4">
          {!isSignInForm && (<input
              type="Name"
              placeholder="Full Name"
              className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          )}
            <input
              type="email"
              placeholder="Email or phone number"
              className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-8 text-white bg-red-600 rounded-md hover:bg-red-700 font-medium"
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