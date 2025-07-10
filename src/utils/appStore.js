import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import moviesReducer from "./movieSlice.js";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    movie: moviesReducer,
  },
});

export default appStore;
