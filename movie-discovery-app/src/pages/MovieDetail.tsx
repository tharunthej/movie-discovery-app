import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store' 
import { useEffect } from 'react'
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { getMovieDetails } from '../redux/movieSlice' 
import { addFavorite, removeFavorite } from '../redux/favoritesSlice' 

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentMovie, loading } = useAppSelector(state => state.movies)
  const favorites = useAppSelector(state => state.favorites.favorites)
  const isFavorite = favorites.some(fav => fav.id === currentMovie?.id)

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(parseInt(id))) 
    }
  }, [id, dispatch])

  const handleFavorite = () => {
    if (currentMovie) {
      if (isFavorite) {
        dispatch(removeFavorite(currentMovie.id))
      } else {
        dispatch(addFavorite(currentMovie))
      }
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!currentMovie) return <div>Movie not found</div>

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft className="mr-2" /> Back to results
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div 
          className="bg-cover bg-center h-96 relative" 
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{currentMovie.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{currentMovie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <span>{currentMovie.release_date.substring(0, 4)}</span>
              </div>
              {currentMovie.runtime && (
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>{Math.floor(currentMovie.runtime / 60)}h {currentMovie.runtime % 60}m</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 text-red-500 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {currentMovie.genres?.map(genre => (
              <span 
                key={genre.id} 
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 mb-6">{currentMovie.overview}</p>
          
          {currentMovie.credits?.cast && currentMovie.credits.cast.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Cast</h2>
              <div className="flex overflow-x-auto pb-4 space-x-4">
                {currentMovie.credits.cast.slice(0, 10).map(person => (
                  <div key={person.id} className="flex-shrink-0 w-24 text-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                    <p className="font-medium mt-1 truncate">{person.name}</p>
                    <p className="text-sm text-gray-600 truncate">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail