import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import type { Movie } from '../types';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import type { RootState } from '../redux/store';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((fav: Movie) => fav.id === movie.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative flex-grow">
        {movie.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-700 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <button 
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-gray-900/70 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? 
            <FaHeart className="text-red-500" /> : 
            <FaRegHeart className="text-white" />
          }
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex justify-between items-center">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded">
              {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-800">
        <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 h-12">
          {movie.overview || 'No description available'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;