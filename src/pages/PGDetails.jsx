import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePG } from '../context/PGContext';
import { LocationIcon, VerifiedIcon, StarIcon } from '../components/Icons';

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, addReview, getReviews, addBooking } = usePG();
  const pg = listings.find(p => p.id === parseInt(id));
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    moveInDate: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (pg) {
      setReviews(getReviews(pg.id));
    }
    
    // Check if student is logged in
    const loggedIn = localStorage.getItem('studentLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const data = JSON.parse(localStorage.getItem('studentData') || '{}');
      setStudentData(data);
      setBookingForm({
        name: data.name || '',
        email: data.email || '',
        phone: '',
        message: '',
        moveInDate: ''
      });
    }
  }, [pg, getReviews]);

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">PG Not Found</h2>
          <button
            onClick={() => navigate('/listings')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewForm.name && reviewForm.comment) {
      addReview(pg.id, reviewForm);
      setReviews([...reviews, { ...reviewForm, id: Date.now(), date: new Date().toISOString() }]);
      setReviewForm({ name: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            filled={i < rating}
          />
        ))}
      </div>
    );
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/student-login');
      return;
    }

    if (pg.availableRooms === 0) {
      alert('Sorry, no rooms are currently available.');
      return;
    }

    const bookingId = addBooking(pg.id, {
      ...bookingForm,
      pgName: pg.name,
      pgLocation: `${pg.area}, ${pg.location}`,
      price: pg.price
    });

    navigate(`/booking-confirmation/${bookingId}`);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-purple-600 hover:text-purple-800 font-semibold"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            {pg.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${pg.name} - Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600';
                }}
              />
            ))}
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{pg.name}</h1>
                <p className="text-gray-600 text-lg flex items-center">
                  <LocationIcon className="w-5 h-5 mr-1 text-gray-500" />
                  {pg.area}, {pg.location}
                </p>
                <p className="text-gray-500">{pg.address}</p>
              </div>
              {pg.verified && (
                <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-1">
                  <VerifiedIcon className="w-4 h-4" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div className="text-3xl font-bold text-purple-600">
                ₹{pg.price.toLocaleString()}
                <span className="text-lg font-normal text-gray-500">/month</span>
              </div>
              <div className="text-right">
                {renderStars(Math.floor(pg.rating))}
                <p className="text-gray-600 mt-1">{pg.rating.toFixed(1)} ({reviews.length} reviews)</p>
              </div>
            </div>

            {/* Booking Button */}
            <div className="mb-6 pb-6 border-b">
              {pg.availableRooms > 0 ? (
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate('/student-login');
                    } else {
                      setShowBookingForm(true);
                    }
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
                >
                  {isLoggedIn ? 'Request Booking' : 'Login to Book'}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg cursor-not-allowed"
                >
                  No Rooms Available
                </button>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Gender</h3>
                <p className="text-gray-600">{pg.gender}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Available Rooms</h3>
                <p className="text-gray-600">{pg.availableRooms} rooms available</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Owner</h3>
                <p className="text-gray-600">{pg.owner}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Contact</h3>
                <p className="text-gray-600">{pg.contact}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{pg.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {pg.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Booking Request</h2>
                    <button
                      onClick={() => setShowBookingForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Move-in Date *
                      </label>
                      <input
                        type="date"
                        value={bookingForm.moveInDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, moveInDate: e.target.value })}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Any additional information..."
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Reviews</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                >
                  {showReviewForm ? 'Cancel' : 'Add Review'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating
                    </label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{review.name}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;

