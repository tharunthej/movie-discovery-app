import { useAppSelector } from '../redux/store';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😢</div>
          <p className="text-xl">You haven't added any favorites yet</p>
          <p className="text-gray-600 mt-2">
            Search for movies and click the heart icon to add them to your favorites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;