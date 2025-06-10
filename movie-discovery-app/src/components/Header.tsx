import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaSearch, FaHome } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-red-500 mr-1">🎬</span> MovieDB
        </Link>
        
        <nav className="flex space-x-4">
          <Link 
            to="/" 
            className={`flex items-center px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-gray-700' : ''}`}
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link 
            to="/favorites" 
            className={`flex items-center px-3 py-2 rounded-md ${location.pathname === '/favorites' ? 'bg-gray-700' : ''}`}
          >
            <FaHeart className="mr-1" /> Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;