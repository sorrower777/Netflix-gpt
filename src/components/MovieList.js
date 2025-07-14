import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-2 md:px-6">
      {title && (
        <h1 className="text-lg md:text-2xl py-4 text-white font-semibold flex items-center gap-2">
          🎬 {title}
        </h1>
      )}
      <div className="flex overflow-x-auto scrollbar-hide pb-4">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title || movie.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
