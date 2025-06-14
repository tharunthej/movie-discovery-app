import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaHome, FaFilm } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center mb-4 md:mb-0">
          <FaFilm className="text-yellow-400 mr-2 text-3xl" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Movie Explorer
          </span>
        </Link>
        
        <nav className="flex space-x-2 md:space-x-4">
          <Link 
            to="/" 
            className={`flex items-center px-3 py-2 rounded-md transition-all ${
              location.pathname === '/' 
                ? 'bg-blue-700 shadow-lg' 
                : 'hover:bg-blue-800'
            }`}
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link 
            to="/favorites" 
            className={`flex items-center px-3 py-2 rounded-md transition-all ${
              location.pathname === '/favorites' 
                ? 'bg-purple-700 shadow-lg' 
                : 'hover:bg-purple-800'
            }`}
          >
            <FaHeart className="mr-1 text-red-400" /> Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;