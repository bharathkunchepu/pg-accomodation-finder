const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PG Finder</h3>
            <p className="text-gray-400">
              Your trusted platform for finding the perfect Paying Guest accommodation.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/listings" className="hover:text-white">Browse PGs</a></li>
              <li><a href="/owner-login" className="hover:text-white">Owner Login</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: support@pgfinder.com<br />
              Phone: +91 1800-123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PG Accommodation Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

