import { useState } from 'react';

const FilterPanel = ({ onFilterChange, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {
    minBudget: '',
    maxBudget: '',
    location: '',
    gender: '',
    amenities: []
  });

  const amenitiesList = ['WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Security', 'Gym', 'Power Backup'];

  const handleChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = localFilters.amenities.includes(amenity)
      ? localFilters.amenities.filter(a => a !== amenity)
      : [...localFilters.amenities, amenity];
    
    const newFilters = { ...localFilters, amenities: newAmenities };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      minBudget: '',
      maxBudget: '',
      location: '',
      gender: '',
      amenities: []
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={handleReset}
          className="text-purple-600 hover:text-purple-800 font-semibold"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Budget Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget Range (₹/month)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minBudget}
              onChange={(e) => handleChange('minBudget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxBudget}
              onChange={(e) => handleChange('maxBudget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <select
            value={localFilters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={localFilters.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer hover:bg-purple-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={localFilters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

