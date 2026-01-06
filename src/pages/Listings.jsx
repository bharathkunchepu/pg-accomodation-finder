import { useState, useMemo } from 'react';
import { usePG } from '../context/PGContext';
import PGCard from '../components/PGCard';
import FilterPanel from '../components/FilterPanel';
import { SearchIcon } from '../components/Icons';

const Listings = () => {
  const { listings, loading } = usePG();
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    location: '',
    gender: '',
    amenities: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');

  const filteredAndSortedPGs = useMemo(() => {
    let filtered = [...listings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        pg =>
          pg.name.toLowerCase().includes(query) ||
          pg.location.toLowerCase().includes(query) ||
          pg.area.toLowerCase().includes(query)
      );
    }

    // Budget filter
    if (filters.minBudget) {
      filtered = filtered.filter(pg => pg.price >= parseInt(filters.minBudget));
    }
    if (filters.maxBudget) {
      filtered = filtered.filter(pg => pg.price <= parseInt(filters.maxBudget));
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(pg => pg.location === filters.location);
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter(pg => pg.gender === filters.gender);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(pg =>
        filters.amenities.every(amenity => pg.amenities.includes(amenity))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [listings, filters, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Browse PG Accommodations</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, location, or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <FilterPanel onFilterChange={setFilters} filters={filters} />
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredAndSortedPGs.length} PG{filteredAndSortedPGs.length !== 1 ? 's' : ''} Found
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="rating-asc">Rating: Low to High</option>
              </select>
            </div>

            {filteredAndSortedPGs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <SearchIcon className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No PGs Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedPGs.map((pg) => (
                  <PGCard key={pg.id} pg={pg} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;

