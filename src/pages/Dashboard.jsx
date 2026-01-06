import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePG } from '../context/PGContext';
import { ClipboardIcon, CheckIcon } from '../components/Icons';

const Dashboard = () => {
  const navigate = useNavigate();
  const { listings, deletePG, getBookings, updateBookingStatus, updatePGStatus } = usePG();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'bookings'

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('ownerLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/owner-login');
    } else {
      // Load bookings for owner's PGs
      const allBookings = getBookings();
      const ownerPGIds = listings.map(pg => pg.id);
      const ownerBookings = allBookings.filter(b => ownerPGIds.includes(b.pgId));
      setBookings(ownerBookings);
    }
  }, [navigate, listings, getBookings]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this PG listing?')) {
      deletePG(id);
      // Refresh bookings after deletion
      const allBookings = getBookings();
      const ownerPGIds = listings.filter(pg => pg.id !== id).map(pg => pg.id);
      const ownerBookings = allBookings.filter(b => ownerPGIds.includes(b.pgId));
      setBookings(ownerBookings);
    }
  };

  const handleBookingAction = (bookingId, status) => {
    updateBookingStatus(bookingId, status);
    // Refresh bookings
    const allBookings = getBookings();
    const ownerPGIds = listings.map(pg => pg.id);
    const ownerBookings = allBookings.filter(b => ownerPGIds.includes(b.pgId));
    setBookings(ownerBookings);
  };

  const handleStatusUpdate = (pgId, status) => {
    updatePGStatus(pgId, status);
  };

  const getBookingPG = (pgId) => {
    return listings.find(pg => pg.id === pgId);
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const approvedBookings = bookings.filter(b => b.status === 'approved');
  const rejectedBookings = bookings.filter(b => b.status === 'rejected');

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Owner Dashboard</h1>
          <Link
            to="/add-pg"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            + Add New PG
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Listings</h3>
            <p className="text-3xl font-bold text-purple-600">{listings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Bookings</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingBookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{approvedBookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">{rejectedBookings.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'listings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'bookings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Manage Bookings
              {pendingBookings.length > 0 && (
                <span className="absolute top-2 right-6 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {pendingBookings.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Pending Bookings */}
            {pendingBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Bookings</h2>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => {
                    const pg = getBookingPG(booking.pgId);
                    if (!pg) return null;
                    return (
                      <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{pg.name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600"><span className="font-semibold">Applicant:</span> {booking.name}</p>
                                <p className="text-gray-600"><span className="font-semibold">Email:</span> {booking.email}</p>
                                <p className="text-gray-600"><span className="font-semibold">Phone:</span> {booking.phone}</p>
                              </div>
                              <div>
                                {booking.moveInDate && (
                                  <p className="text-gray-600"><span className="font-semibold">Move-in Date:</span> {new Date(booking.moveInDate).toLocaleDateString()}</p>
                                )}
                                <p className="text-gray-600"><span className="font-semibold">Price:</span> ₹{booking.price.toLocaleString()}/month</p>
                                <p className="text-gray-600"><span className="font-semibold">Requested:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            {booking.message && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600"><span className="font-semibold">Message:</span> {booking.message}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <button
                              onClick={() => handleBookingAction(booking.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2"
                            >
                              <CheckIcon className="w-5 h-5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'rejected')}
                              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Bookings */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">All Bookings</h2>
              {bookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const pg = getBookingPG(booking.pgId);
                    if (!pg) return null;
                    return (
                      <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{pg.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600"><span className="font-semibold">Applicant:</span> {booking.name} ({booking.email})</p>
                            <p className="text-gray-600"><span className="font-semibold">Phone:</span> {booking.phone}</p>
                            <p className="text-gray-600 text-sm mt-2"><span className="font-semibold">Requested:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Total Listings: {listings.length}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((pg) => (
                <div key={pg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={pg.images?.[0] || 'https://via.placeholder.com/400x300'}
                      alt={pg.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300';
                      }}
                    />
                    {pg.status && (
                      <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        pg.status === 'vacant' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {pg.status.charAt(0).toUpperCase() + pg.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{pg.name}</h3>
                    <p className="text-gray-600 mb-2">{pg.area}, {pg.location}</p>
                    <p className="text-2xl font-bold text-purple-600 mb-2">
                      ₹{pg.price.toLocaleString()}/month
                    </p>
                    <p className="text-gray-600 mb-4">Available Rooms: {pg.availableRooms}</p>
                    
                    {/* Status Update */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={pg.status || 'vacant'}
                        onChange={(e) => handleStatusUpdate(pg.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="vacant">Vacant</option>
                        <option value="occupied">Occupied</option>
                      </select>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-pg/${pg.id}`}
                        className="flex-1 bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(pg.id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {listings.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <ClipboardIcon className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Listings Yet</h3>
                <p className="text-gray-600 mb-6">Start by adding your first PG listing</p>
                <Link
                  to="/add-pg"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 inline-block"
                >
                  Add Your First PG
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

