import { Link } from 'react-router-dom';
import { usePG } from '../context/PGContext';
import PGCard from '../components/PGCard';
import { VerifiedIcon, SearchIcon, StarIcon } from '../components/Icons';
import Logo from '../components/Logo';

const Home = () => {
  const { listings } = usePG();
  const featuredPGs = listings.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Logo className="h-20" variant="white" showTagline={true} />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Find Your Perfect PG Accommodation
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Safe, Comfortable, and Verified Paying Guest Accommodations
            </p>
            <Link
              to="/listings"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors inline-block"
            >
              Browse All PGs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose PG Finder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <VerifiedIcon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All PG accommodations are verified for safety and quality
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <SearchIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Find PGs based on budget, location, and amenities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <StarIcon className="w-8 h-8 text-yellow-600" filled />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Real Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from verified residents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured PGs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured PGs</h2>
            <Link
              to="/listings"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPGs.map((pg) => (
              <PGCard key={pg.id} pg={pg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

