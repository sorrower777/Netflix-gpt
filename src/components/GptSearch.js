import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <img className="w-full h-full object-cover" src={BG_URL} alt="background" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 pb-20">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};
export default GPTSearch;
