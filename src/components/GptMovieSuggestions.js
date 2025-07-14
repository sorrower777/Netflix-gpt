import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="px-4 py-8 mx-4 mt-8 bg-black/90 backdrop-blur-sm text-white rounded-xl shadow-2xl border border-gray-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-red-400">
          🎭 Movie Recommendations
        </h2>
        <div className="space-y-8">
          {movieNames.map((movieName, index) => (
            <div key={movieName} className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg md:text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                🎬 {movieName}
              </h3>
              <MovieList
                title=""
                movies={movieResults[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
