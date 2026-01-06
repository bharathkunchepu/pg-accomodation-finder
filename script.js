// Sample PG Data
const pgData = [
    {
        id: 1,
        name: "Comfort Stay PG",
        location: "Bangalore",
        area: "Koramangala",
        price: 12000,
        facilities: ["wifi", "food", "laundry", "security"],
        rating: 4.5,
        reviews: 128,
        verified: true
    },
    {
        id: 2,
        name: "Elite Residency",
        location: "Mumbai",
        area: "Andheri",
        price: 15000,
        facilities: ["wifi", "ac", "food", "parking", "security"],
        rating: 4.8,
        reviews: 95,
        verified: true
    },
    {
        id: 3,
        name: "Student Hub PG",
        location: "Delhi",
        area: "Dwarka",
        price: 8000,
        facilities: ["wifi", "food", "laundry"],
        rating: 4.2,
        reviews: 156,
        verified: true
    },
    {
        id: 4,
        name: "Green Valley PG",
        location: "Pune",
        area: "Hinjewadi",
        price: 10000,
        facilities: ["wifi", "ac", "parking", "security"],
        rating: 4.6,
        reviews: 87,
        verified: true
    },
    {
        id: 5,
        name: "Modern Living PG",
        location: "Hyderabad",
        area: "Gachibowli",
        price: 11000,
        facilities: ["wifi", "ac", "food", "laundry", "parking", "security"],
        rating: 4.7,
        reviews: 112,
        verified: true
    },
    {
        id: 6,
        name: "Budget Stay PG",
        location: "Bangalore",
        area: "Whitefield",
        price: 7000,
        facilities: ["wifi", "food"],
        rating: 3.9,
        reviews: 203,
        verified: true
    },
    {
        id: 7,
        name: "Premium Residency",
        location: "Mumbai",
        area: "Powai",
        price: 18000,
        facilities: ["wifi", "ac", "food", "laundry", "parking", "security"],
        rating: 4.9,
        reviews: 64,
        verified: true
    },
    {
        id: 8,
        name: "Cozy Nest PG",
        location: "Chennai",
        area: "OMR",
        price: 9500,
        facilities: ["wifi", "ac", "food", "security"],
        rating: 4.4,
        reviews: 91,
        verified: true
    },
    {
        id: 9,
        name: "City Center PG",
        location: "Delhi",
        area: "Rohini",
        price: 9000,
        facilities: ["wifi", "food", "laundry", "parking"],
        rating: 4.3,
        reviews: 145,
        verified: true
    },
    {
        id: 10,
        name: "Tech Park PG",
        location: "Pune",
        area: "Viman Nagar",
        price: 13000,
        facilities: ["wifi", "ac", "food", "laundry", "parking", "security"],
        rating: 4.6,
        reviews: 78,
        verified: true
    }
];

// Global variables
let filteredData = [...pgData];

// DOM Elements
const locationSearch = document.getElementById('locationSearch');
const searchBtn = document.getElementById('searchBtn');
const minBudget = document.getElementById('minBudget');
const maxBudget = document.getElementById('maxBudget');
const locationFilter = document.getElementById('locationFilter');
const facilitiesCheckboxes = document.querySelectorAll('.facilities-checkboxes input[type="checkbox"]');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const pgListings = document.getElementById('pgListings');
const resultsCount = document.getElementById('resultsCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayPGs(pgData);
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    locationSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
}

// Search Function
function handleSearch() {
    const searchTerm = locationSearch.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredData = [...pgData];
    } else {
        filteredData = pgData.filter(pg => 
            pg.location.toLowerCase().includes(searchTerm) ||
            pg.area.toLowerCase().includes(searchTerm) ||
            pg.name.toLowerCase().includes(searchTerm)
        );
    }
    
    applyFilters();
}

// Apply Filters
function applyFilters() {
    let results = [...filteredData];
    
    // Budget Filter
    const min = parseInt(minBudget.value) || 0;
    const max = parseInt(maxBudget.value) || Infinity;
    results = results.filter(pg => pg.price >= min && pg.price <= max);
    
    // Location Filter
    const selectedLocation = locationFilter.value;
    if (selectedLocation) {
        results = results.filter(pg => pg.location === selectedLocation);
    }
    
    // Facilities Filter
    const selectedFacilities = Array.from(facilitiesCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    if (selectedFacilities.length > 0) {
        results = results.filter(pg => 
            selectedFacilities.every(facility => pg.facilities.includes(facility))
        );
    }
    
    displayPGs(results);
}

// Reset Filters
function resetFilters() {
    locationSearch.value = '';
    minBudget.value = '';
    maxBudget.value = '';
    locationFilter.value = '';
    facilitiesCheckboxes.forEach(cb => cb.checked = false);
    filteredData = [...pgData];
    displayPGs(pgData);
}

// Display PG Listings
function displayPGs(pgs) {
    if (pgs.length === 0) {
        pgListings.innerHTML = `
            <div class="no-results">
                <h3>No accommodations found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        resultsCount.textContent = 'No Results Found';
        return;
    }
    
    resultsCount.textContent = `${pgs.length} Accommodation${pgs.length > 1 ? 's' : ''} Found`;
    
    pgListings.innerHTML = pgs.map(pg => `
        <div class="pg-card">
            <div class="pg-card-header">
                <div class="pg-name">${pg.name}</div>
                ${pg.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </div>
            <div class="pg-location">
                📍 ${pg.area}, ${pg.location}
            </div>
            <div class="pg-price">
                ₹${pg.price.toLocaleString()}<span>/month</span>
            </div>
            <div class="pg-facilities">
                ${pg.facilities.map(facility => 
                    `<span class="facility-tag">${getFacilityName(facility)}</span>`
                ).join('')}
            </div>
            <div class="pg-reviews">
                <div class="rating">
                    <span class="stars">${getStars(pg.rating)}</span>
                    <span class="rating-text">${pg.rating}</span>
                    <span class="review-count">(${pg.reviews} verified reviews)</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Get Facility Name
function getFacilityName(facility) {
    const facilityNames = {
        'wifi': 'WiFi',
        'ac': 'AC',
        'food': 'Food',
        'laundry': 'Laundry',
        'parking': 'Parking',
        'security': 'Security'
    };
    return facilityNames[facility] || facility;
}

// Get Stars
function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) {
        stars += '½';
    }
    const emptyStars = 5 - Math.ceil(rating);
    stars += '☆'.repeat(emptyStars);
    return stars;
}

