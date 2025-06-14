import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-gray-400 text-sm">
        Movie Discovery App &copy; {new Date().getFullYear()} • Made with ❤️
      </footer>
    </div>
  );
};

export default Layout;