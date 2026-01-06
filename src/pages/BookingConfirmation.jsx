import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePG } from '../context/PGContext';
import { CheckIcon } from '../components/Icons';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBookings, listings } = usePG();
  const [booking, setBooking] = useState(null);
  const [pg, setPg] = useState(null);

  useEffect(() => {
    const bookings = getBookings();
    const foundBooking = bookings.find(b => b.id === parseInt(bookingId));
    
    if (foundBooking) {
      setBooking(foundBooking);
      const pgData = listings.find(p => p.id === foundBooking.pgId);
      setPg(pgData);
    } else {
      navigate('/listings');
    }
  }, [bookingId, getBookings, listings, navigate]);

  if (!booking || !pg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <CheckIcon className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Request Submitted!</h1>
            <p className="text-green-100">Your request has been sent to the PG owner</p>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Booking ID:</span>
                  <span className="text-gray-800 font-bold">#{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">PG Details</h3>
                  <p className="text-gray-600">{pg.name}</p>
                  <p className="text-gray-600">{booking.pgLocation}</p>
                  <p className="text-purple-600 font-bold text-lg mt-2">₹{booking.price.toLocaleString()}/month</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Information</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div>
                  <span className="text-gray-600 font-semibold">Name:</span>
                  <span className="text-gray-800 ml-2">{booking.name}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Email:</span>
                  <span className="text-gray-800 ml-2">{booking.email}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Phone:</span>
                  <span className="text-gray-800 ml-2">{booking.phone}</span>
                </div>
                {booking.moveInDate && (
                  <div>
                    <span className="text-gray-600 font-semibold">Move-in Date:</span>
                    <span className="text-gray-800 ml-2">
                      {new Date(booking.moveInDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                <li>The PG owner will review your booking request</li>
                <li>You will receive an email/SMS notification once the owner responds</li>
                <li>Check your booking status in your account</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/listings"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Browse More PGs
              </Link>
              <Link
                to={`/pg/${pg.id}`}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View PG Details
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

