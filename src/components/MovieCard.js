import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 flex-shrink-0">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-600"
      />
      <h3 className="text-white text-sm md:text-base font-medium mt-2 px-1 text-center line-clamp-2 leading-tight">
        {title}
      </h3>
    </div>
  );
};
export default MovieCard;
