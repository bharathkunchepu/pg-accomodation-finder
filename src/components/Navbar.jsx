import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomeIcon, DashboardIcon, LogoutIcon, UserIcon } from './Icons';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(
    localStorage.getItem('ownerLoggedIn') === 'true'
  );
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(
    localStorage.getItem('studentLoggedIn') === 'true'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsOwnerLoggedIn(localStorage.getItem('ownerLoggedIn') === 'true');
    setIsStudentLoggedIn(localStorage.getItem('studentLoggedIn') === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('ownerLoggedIn');
    setIsOwnerLoggedIn(false);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleStudentLogout = () => {
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentData');
    setIsStudentLoggedIn(false);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <Logo className="h-14" variant="white" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                location.pathname === '/' 
                  ? 'bg-white bg-opacity-20 text-white font-semibold shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/listings" 
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                location.pathname === '/listings' 
                  ? 'bg-white bg-opacity-20 text-white font-semibold shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Browse PGs
            </Link>
            
            {isOwnerLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                    location.pathname === '/dashboard' 
                      ? 'bg-white bg-opacity-20 text-white font-semibold shadow-md' 
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <DashboardIcon className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <LogoutIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : isStudentLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                    location.pathname === '/profile' 
                      ? 'bg-white bg-opacity-20 text-white font-semibold shadow-md' 
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <UserIcon className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={handleStudentLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <LogoutIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/student-login" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-all duration-200 font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Student/Prof</span>
                </Link>
                <Link 
                  to="/owner-login" 
                  className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-all duration-200 font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Owner</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-md transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white border-opacity-20">
            <Link 
              to="/" 
              className={`block px-4 py-3 text-white rounded-md mb-1 transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'bg-white bg-opacity-20 font-semibold' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className={`block px-4 py-3 text-white rounded-md mb-1 transition-all duration-200 ${
                location.pathname === '/listings' 
                  ? 'bg-white bg-opacity-20 font-semibold' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse PGs
            </Link>
            {isOwnerLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-4 py-3 text-white rounded-md mb-1 transition-all duration-200 ${
                    location.pathname === '/dashboard' 
                      ? 'bg-white bg-opacity-20 font-semibold' 
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : isStudentLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className={`block px-4 py-3 text-white rounded-md mb-1 transition-all duration-200 ${
                    location.pathname === '/profile' 
                      ? 'bg-white bg-opacity-20 font-semibold' 
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleStudentLogout}
                  className="w-full text-left px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/student-login" 
                  className="block px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-md text-center font-semibold mb-2 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Student/Prof Login
                </Link>
                <Link 
                  to="/owner-login" 
                  className="block px-4 py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-md text-center font-semibold transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Owner Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

