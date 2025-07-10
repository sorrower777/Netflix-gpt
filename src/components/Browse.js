import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";

const Browse = () => {
  // Fetch Data from TMDB API and update store
  useNowPlayingMovies();
  return (
    <div className="p-4 bg-white dark:bg-black min-h-screen" >
      <Header />
      <div className="pt-20 text-black dark:text-white">
        <h1 className="text-3xl font-bold">Browse Content</h1>
        {/* Your browse content here */}
      </div>
    </div>
  );
};

export default Browse;
