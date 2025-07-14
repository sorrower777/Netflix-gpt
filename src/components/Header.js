import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    console.log("Sign out button clicked");
    if (!auth) {
      // If no auth, clear user from Redux and localStorage
      console.log("Using demo auth - clearing user and navigating to /");
      dispatch(removeUser());
      localStorage.removeItem('netflix-gpt-user');
      navigate("/");
      return;
    }

    console.log("Using Firebase auth - signing out");
    signOut(auth)
      .then(() => {
        console.log("Firebase sign out successful");
      })
      .catch((error) => {
        console.log("Firebase sign out error:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    console.log("Header useEffect running, auth:", !!auth, "current user:", !!user);

    // Only set up auth listener if Firebase auth is available
    if (!auth) {
      // In demo mode, check localStorage for persisted user only if no user is currently logged in
      if (!user) {
        const savedUser = localStorage.getItem('netflix-gpt-user');
        console.log("Checking localStorage for saved user:", savedUser);

        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            console.log("Found saved user data:", userData);
            dispatch(addUser(userData));
            // If we're on login page but have saved user, go to browse
            if (window.location.pathname === "/") {
              console.log("Navigating to /browse from login page");
              navigate("/browse");
            }
          } catch (error) {
            console.log("Error parsing saved user data:", error);
            localStorage.removeItem('netflix-gpt-user');
          }
        } else {
          console.log("No saved user found");
          // No saved user, check if we're on browse page without being logged in
          if (window.location.pathname === "/browse") {
            console.log("On browse page without user, navigating to login");
            navigate("/");
          }
        }
      } else {
        console.log("User already exists, skipping localStorage check");
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-4 md:px-8 py-4 bg-gradient-to-b from-black via-black/80 to-transparent z-20 flex flex-col md:flex-row justify-between items-center">
      <img className="w-32 md:w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm md:text-base"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "🏠 Homepage" : "🔍 GPT Search"}
          </button>
          <img
            className="hidden md:block w-10 h-10 rounded-full border-2 border-gray-600"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-medium text-white hover:text-red-400 transition-colors duration-200 text-sm md:text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
