# PG Accommodation Finder

A complete frontend-only React application for finding Paying Guest (PG) accommodations for students and professionals. Built with React Router, Context API, and TailwindCSS.

## Features

- 🏠 **Browse PG Listings** - View all available PG accommodations
- 🔍 **Advanced Search & Filters** - Search by location, filter by budget, gender, and amenities
- 📊 **Sorting** - Sort listings by price or rating
- ⭐ **Review System** - Add and view reviews for PG accommodations (stored in localStorage)
- 👤 **Owner Dashboard** - PG owners can manage their listings
- ➕ **Add/Edit PGs** - Owners can add new listings or edit existing ones
- 🎨 **Modern UI** - Beautiful, responsive design with TailwindCSS

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **Local JSON** - Data storage (pgs.json)

## Project Structure

```
pg-accommodation-finder/
├── public/
│   └── pgs.json              # Sample PG data
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Footer.jsx        # Footer component
│   │   ├── PGCard.jsx        # PG listing card
│   │   └── FilterPanel.jsx   # Filter component
│   ├── context/
│   │   └── PGContext.jsx     # Global state management
│   ├── pages/
│   │   ├── Home.jsx          # Home page
│   │   ├── Listings.jsx      # PG listings with filters
│   │   ├── PGDetails.jsx     # PG detail page
│   │   ├── OwnerLogin.jsx    # Owner login page
│   │   ├── Dashboard.jsx     # Owner dashboard
│   │   ├── AddPG.jsx         # Add new PG
│   │   └── EditPG.jsx        # Edit existing PG
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The app will be available at `http://localhost:5173` (or the port shown in terminal)

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Usage Guide

### For Users

1. **Browse PGs**: Navigate to "Browse PGs" to see all listings
2. **Search**: Use the search bar to find PGs by name, location, or area
3. **Filter**: Use filters to narrow down by:
   - Budget range
   - Location (city)
   - Gender (Boys/Girls/Unisex)
   - Amenities (WiFi, AC, Food, etc.)
4. **Sort**: Sort results by price or rating
5. **View Details**: Click on any PG card to see full details
6. **Add Review**: On the PG details page, click "Add Review" to submit a review

### For Owners

1. **Login**: Click "Owner Login" and enter any email/password (mock authentication)
2. **Dashboard**: View all your PG listings
3. **Add PG**: Click "Add New PG" to create a new listing
4. **Edit PG**: Click "Edit" on any listing to modify it
5. **Delete PG**: Click "Delete" to remove a listing

## Data Storage

- **PG Listings**: Stored in `public/pgs.json` and loaded via fetch()
- **Reviews**: Stored in browser's localStorage (key: `reviews_{pgId}`)
- **Owner Login**: Stored in localStorage (key: `ownerLoggedIn`)

## Features in Detail

### Search & Filter
- Real-time search by location, area, or PG name
- Multiple filter options working together
- Dynamic result count

### Review System
- Add reviews with name, rating (1-5 stars), and comment
- Reviews persist in localStorage
- Average rating calculated automatically
- Reviews displayed chronologically

### Owner Features
- Mock login (accepts any credentials)
- Full CRUD operations (Create, Read, Update, Delete)
- Protected routes (redirects to login if not authenticated)
- Dashboard shows all listings with quick actions

## Customization

### Adding More Cities
Edit `public/pgs.json` and add entries with different cities. Also update the location dropdown in:
- `src/components/FilterPanel.jsx`
- `src/pages/AddPG.jsx`
- `src/pages/EditPG.jsx`

### Adding More Amenities
Update the `amenitiesList` array in:
- `src/components/FilterPanel.jsx`
- `src/pages/AddPG.jsx`
- `src/pages/EditPG.jsx`

### Styling
All styles use TailwindCSS. Modify classes in components or extend the theme in `tailwind.config.js`.

## Notes

- This is a **frontend-only** application with no backend
- Data persists only during the session (except reviews in localStorage)
- Owner login is mock - any credentials work
- Images use placeholder URLs - replace with actual image URLs
- Reviews are stored per PG in localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

