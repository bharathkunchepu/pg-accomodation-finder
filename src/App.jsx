import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PGProvider } from './context/PGContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PGDetails from './pages/PGDetails';
import OwnerLogin from './pages/OwnerLogin';
import StudentLogin from './pages/StudentLogin';
import Dashboard from './pages/Dashboard';
import AddPG from './pages/AddPG';
import EditPG from './pages/EditPG';
import BookingConfirmation from './pages/BookingConfirmation';
import Profile from './pages/Profile';

function App() {
  return (
    <PGProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/pg/:id" element={<PGDetails />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/owner-login" element={<OwnerLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-pg" element={<AddPG />} />
              <Route path="/edit-pg/:id" element={<EditPG />} />
              <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PGProvider>
  );
}

export default App;

