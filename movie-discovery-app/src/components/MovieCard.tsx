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
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        {movie.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <button 
          onClick={handleFavorite}
          className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;