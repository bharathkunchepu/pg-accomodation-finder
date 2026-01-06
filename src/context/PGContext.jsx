import { createContext, useContext, useState, useEffect } from 'react';

const PGContext = createContext();

export const usePG = () => {
  const context = useContext(PGContext);
  if (!context) {
    throw new Error('usePG must be used within a PGProvider');
  }
  return context;
};

export const PGProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load PGs from JSON file
  useEffect(() => {
    const loadPGs = async () => {
      try {
        const response = await fetch('/pgs.json');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error loading PGs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPGs();
  }, []);

  // Add PG
  const addPG = (newPG) => {
    const id = Math.max(...listings.map(pg => pg.id), 0) + 1;
    const pgWithId = { ...newPG, id, verified: false };
    setListings([...listings, pgWithId]);
    return id;
  };

  // Edit PG
  const editPG = (id, updatedPG) => {
    setListings(listings.map(pg => pg.id === id ? { ...updatedPG, id } : pg));
  };

  // Delete PG
  const deletePG = (id) => {
    setListings(listings.filter(pg => pg.id !== id));
  };

  // Add Review
  const addReview = (pgId, review) => {
    const reviews = JSON.parse(localStorage.getItem(`reviews_${pgId}`) || '[]');
    const newReview = {
      id: Date.now(),
      ...review,
      date: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem(`reviews_${pgId}`, JSON.stringify(reviews));
    
    // Update rating
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    setListings(listings.map(pg => 
      pg.id === pgId ? { ...pg, rating: avgRating } : pg
    ));
  };

  // Get Reviews
  const getReviews = (pgId) => {
    return JSON.parse(localStorage.getItem(`reviews_${pgId}`) || '[]');
  };

  // Add Booking Request
  const addBooking = (pgId, bookingData) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      pgId: parseInt(pgId),
      status: 'pending', // pending, approved, rejected
      ...bookingData,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return newBooking.id;
  };

  // Get Bookings
  const getBookings = (pgId = null) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (pgId) {
      return bookings.filter(b => b.pgId === parseInt(pgId));
    }
    return bookings;
  };

  // Update Booking Status
  const updateBookingStatus = (bookingId, status) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status, updatedAt: new Date().toISOString() }
        : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // Update available rooms if approved
    if (status === 'approved') {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        const pg = listings.find(p => p.id === booking.pgId);
        if (pg && pg.availableRooms > 0) {
          editPG(booking.pgId, { ...pg, availableRooms: pg.availableRooms - 1 });
        }
      }
    }
  };

  // Update PG Status (Vacant/Occupied)
  const updatePGStatus = (pgId, status) => {
    const pg = listings.find(p => p.id === parseInt(pgId));
    if (pg) {
      editPG(parseInt(pgId), { ...pg, status: status }); // status: 'vacant' or 'occupied'
    }
  };

  const value = {
    listings,
    loading,
    addPG,
    editPG,
    deletePG,
    addReview,
    getReviews,
    addBooking,
    getBookings,
    updateBookingStatus,
    updatePGStatus
  };

  return <PGContext.Provider value={value}>{children}</PGContext.Provider>;
};

