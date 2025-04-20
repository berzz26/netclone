import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-netflix-black bg-opacity-95 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg"
              alt="Netflix Logo"
              className="h-12 sm:h-20 object-contain" // Increased from h-8 sm:h-10
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'font-medium' : 'text-gray-300 hover:text-white'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className={`nav-link ${location.pathname === '/movies' ? 'font-medium' : 'text-gray-300 hover:text-white'}`}>
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/tv" className={`nav-link ${location.pathname === '/tv' ? 'font-medium' : 'text-gray-300 hover:text-white'}`}>
                  TV Shows
                </Link>
              </li>
              <li>
                <Link to="/my-list" className={`nav-link ${location.pathname === '/my-list' ? 'font-medium' : 'text-gray-300 hover:text-white'}`}>
                  My List
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Right Side Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black bg-opacity-70 text-white border border-gray-700 rounded px-3 py-1 pl-9 focus:outline-none focus:border-white transition-all w-32 focus:w-56"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="text-white p-1 relative" aria-label="Notifications">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 bg-netflix-red rounded-full w-2 h-2"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    className="flex items-center text-white"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="bg-netflix-red rounded-sm w-8 h-8 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 border border-gray-800 rounded shadow-lg py-1 animate-slide-up">
                      <Link to="/profile" className="block px-4 py-2 text-gray-200 hover:bg-gray-800">
                        Account
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 text-gray-200 hover:bg-gray-800">
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-800"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-netflix-red text-white px-4 py-1 rounded font-medium hover:bg-red-700 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 bg-black bg-opacity-95 rounded-lg p-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-white py-2 border-b border-gray-800">
                Home
              </Link>
              <Link to="/movies" className="text-white py-2 border-b border-gray-800">
                Movies
              </Link>
              <Link to="/tv" className="text-white py-2 border-b border-gray-800">
                TV Shows
              </Link>
              <Link to="/my-list" className="text-white py-2 border-b border-gray-800">
                My List
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 pl-9 focus:outline-none focus:border-white"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>

              {!isAuthenticated && (
                <Link to="/login" className="bg-netflix-red text-white py-2 rounded font-medium hover:bg-red-700 transition-colors text-center mt-2">
                  Sign In
                </Link>
              )}

              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="bg-gray-800 text-white py-2 rounded font-medium hover:bg-gray-700 transition-colors text-center mt-2"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;