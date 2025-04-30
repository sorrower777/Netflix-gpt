import React from "react";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../utils/themeSlice.js";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useEffect } from "react";



const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const darkMode = useSelector(store => store.theme.darkMode);
  
  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
      navigate("/error");
    });
  };
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  const isAuthPage = location.pathname === "/login" || location.pathname === "/";
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const {uid, email, displayName, photoURL} = user;
            dispatch(
              addUser({
                uid: uid, 
                email: email, 
                displayName: displayName, 
                photoURL: photoURL || "https://avatars.githubusercontent.com/u/123868221?v=4"
              })
            );
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
        }
    });
    
    // Clean up subscription
    return () => unsubscribe();
}, [dispatch,navigate]);
  return (
     <header className="absolute top-0 w-full z-50">
      <div className="px-4 py-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://cdn.cdnlogo.com/logos/n/82/netflix.png" 
            alt="Netflix Logo"
            className="h-8 md:h-12" 
          />
        </div>
        <div className="flex items-center gap-4">
          {/* Theme toggle button - always visible */}
          <button 
            onClick={handleThemeToggle} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          
          {/* User profile and sign out - only when logged in */}
          {user && !isAuthPage && (
            <>
              <img 
                src={user.photoURL || "https://avatars.githubusercontent.com/u/123868221?v=4"} 
                alt="User Profile" 
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.src = "https://avatars.githubusercontent.com/u/123868221?v=4";
                }}
              /> 
              <button 
                onClick={handleSignOut} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm md:text-base"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header> 
  );
};

export default Header;
