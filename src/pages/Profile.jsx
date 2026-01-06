import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePG } from '../context/PGContext';
import { UserIcon, LocationIcon } from '../components/Icons';

const Profile = () => {
  const navigate = useNavigate();
  const { listings, getBookings } = usePG();
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    userType: ''
  });
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'profile'

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('studentLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/student-login');
      return;
    }

    // Load user data
    const storedData = JSON.parse(localStorage.getItem('studentData') || '{}');
    if (storedData.id) {
      // Get full user data from users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === storedData.id);
      
      if (user) {
        setUserData(user);
        setEditForm({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          userType: user.userType || 'student'
        });
      } else {
        setUserData(storedData);
        setEditForm({
          name: storedData.name || '',
          email: storedData.email || '',
          phone: '',
          userType: storedData.userType || 'student'
        });
      }
    }

    // Load user bookings
    if (storedData.email) {
      const allBookings = getBookings();
      const bookings = allBookings.filter(b => b.email === storedData.email);
      setUserBookings(bookings);
    }
  }, [navigate, getBookings]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    if (!editForm.name || !editForm.email) {
      alert('Name and Email are required');
      return;
    }

    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === userData.id 
        ? { ...u, ...editForm }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update studentData in localStorage
    localStorage.setItem('studentData', JSON.stringify({
      id: userData.id,
      name: editForm.name,
      email: editForm.email,
      userType: editForm.userType
    }));

    setUserData({ ...userData, ...editForm });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getBookingPG = (pgId) => {
    return listings.find(pg => pg.id === pgId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'bookings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Bookings ({userBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile Details
            </button>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            {userBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
                <p className="text-gray-600 mb-6">Start browsing PGs and make your first booking!</p>
                <Link
                  to="/listings"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 inline-block"
                >
                  Browse PGs
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking) => {
                  const pg = getBookingPG(booking.pgId);
                  if (!pg) return null;
                  
                  return (
                    <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-gray-800">{pg.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600 flex items-center mb-1">
                              <LocationIcon className="w-4 h-4 mr-1" />
                              {booking.pgLocation || `${pg.area}, ${pg.location}`}
                            </p>
                            <p className="text-purple-600 font-bold text-lg">
                              ₹{booking.price.toLocaleString()}/month
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4 border-t">
                          <div>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Booking ID:</span> #{booking.id}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Requested:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            {booking.moveInDate && (
                              <p className="text-sm text-gray-600"><span className="font-semibold">Move-in Date:</span> {new Date(booking.moveInDate).toLocaleDateString()}</p>
                            )}
                            {booking.updatedAt && (
                              <p className="text-sm text-gray-600"><span className="font-semibold">Last Updated:</span> {new Date(booking.updatedAt).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>

                        {booking.message && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600"><span className="font-semibold">Your Message:</span> {booking.message}</p>
                          </div>
                        )}

                        <div className="mt-4 flex space-x-3">
                          <Link
                            to={`/pg/${pg.id}`}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                          >
                            View PG Details
                          </Link>
                          {booking.status === 'pending' && (
                            <Link
                              to={`/booking-confirmation/${booking.id}`}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                              View Request
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      User Type
                    </label>
                    <select
                      value={editForm.userType}
                      onChange={(e) => setEditForm({ ...editForm, userType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone || '',
                        userType: userData.userType || 'student'
                      });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <UserIcon className="w-12 h-12 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{userData.name}</h3>
                    <p className="text-gray-600 capitalize">{userData.userType || 'student'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-gray-800">{userData.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <p className="text-gray-800">{userData.phone || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      User Type
                    </label>
                    <p className="text-gray-800 capitalize">{userData.userType || 'student'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Created
                    </label>
                    <p className="text-gray-800">
                      {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

