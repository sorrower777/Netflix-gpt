import openai from "../utils/openai";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // Check if OpenAI client is available
    if (!openai) {
      // Fallback: Use TMDB search directly
      console.log("OpenAI not available, using TMDB search fallback");
      const searchResults = await searchMovieTMDB(searchText.current.value);
      const movieNames = searchResults.slice(0, 5).map(movie => movie.title);
      const movieResults = [searchResults.slice(0, 5)];

      dispatch(
        addGptMovieResult({ movieNames, movieResults })
      );
      return;
    }

    try {
      // Make an API call to GPT API and get Movie Results
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (!gptResults.choices) {
        throw new Error("No GPT results received");
      }

      console.log(gptResults.choices?.[0]?.message?.content);

      // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

      // For each movie I will search TMDB API
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error with GPT search:", error);
      // Fallback to TMDB search
      const searchResults = await searchMovieTMDB(searchText.current.value);
      const movieNames = searchResults.slice(0, 5).map(movie => movie.title);
      const movieResults = [searchResults.slice(0, 5)];

      dispatch(
        addGptMovieResult({ movieNames, movieResults })
      );
    }
  };

  return (
    <div className="pt-[25%] md:pt-[8%] flex justify-center px-4">
      <form
        className="w-full max-w-4xl bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="p-6">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-6 text-center">
            🎬 Discover Movies with AI
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              ref={searchText}
              type="text"
              className="flex-1 p-4 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
              onClick={handleGptSearchClick}
            >
              🔍 {lang[langKey].search}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default GptSearchBar;
