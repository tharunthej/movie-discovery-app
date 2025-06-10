import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-gray-500">
        Movie Discovery &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout