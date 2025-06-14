import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../redux/movieSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector(state => state.movies);

  useEffect(() => {
    dispatch(searchMovies({ query: '', page: 1 }));
  }, [dispatch]);

  return (
    <div className="text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
          Discover Amazing Movies
        </h1>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Explore thousands of movies, find your favorites, and discover new gems
        </p>
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-8 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {movies.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="text-8xl mb-4">🔍</div>
          <p className="text-2xl font-medium mb-2">No movies found</p>
          <p className="text-gray-400 max-w-md mx-auto">
            Try searching for something else or browse popular movies
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie, index) => (
            <div key={movie.id} className="movie-card transition-all duration-300">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-16">
          <div className="loading-spinner rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Home;