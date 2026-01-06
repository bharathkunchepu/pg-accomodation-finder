import { Link } from 'react-router-dom';
import { LocationIcon, VerifiedIcon, StarIcon } from './Icons';

const PGCard = ({ pg }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400' : i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-gray-300'}`}
            filled={i < fullStars || (i === fullStars && hasHalfStar)}
          />
        ))}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Link to={`/pg/${pg.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 bg-gray-200">
          <img
            src={pg.images?.[0] || 'https://via.placeholder.com/400x300'}
            alt={pg.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300';
            }}
          />
          {pg.verified && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <VerifiedIcon className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{pg.name}</h3>
          </div>
          
          <p className="text-gray-600 mb-2 flex items-center">
            <LocationIcon className="w-4 h-4 mr-1 text-gray-500" />
            {pg.area}, {pg.location}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-purple-600">
              ₹{pg.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </div>
          </div>
          
          <div className="mb-3">
            {renderStars(pg.rating)}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {pg.amenities.slice(0, 4).map((amenity, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold"
              >
                {amenity}
              </span>
            ))}
            {pg.amenities.length > 4 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                +{pg.amenities.length - 4} more
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Gender:</span> {pg.gender} | 
            <span className="font-semibold ml-2">Rooms:</span> {pg.availableRooms} available
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PGCard;

