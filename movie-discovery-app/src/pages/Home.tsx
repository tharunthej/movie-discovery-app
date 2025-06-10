import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store' 
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { searchMovies } from '../redux/movieSlice' 

const Home = () => {
  const dispatch = useAppDispatch()
  const { movies, loading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(searchMovies({ query: '', page: 1 })) // Fixed action call
  }, [dispatch])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Discover Movies</h1>
        <SearchBar />
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {movies.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl">No movies found</p>
          <p className="text-gray-600 mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  )
}

export default Home