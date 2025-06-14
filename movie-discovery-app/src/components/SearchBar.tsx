import { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { searchMovies } from '../redux/movieSlice';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies({ query, page: 1 }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="search-bar bg-gray-800 rounded-full p-1 shadow-xl"
      >
        <div className="flex items-center">
          <div className="pl-4 text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 font-medium shadow-lg"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;