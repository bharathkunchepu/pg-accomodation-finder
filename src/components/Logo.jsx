const Logo = ({ className = "h-12", showTagline = false, variant = "default" }) => {
  // Color variants: default (purple/indigo), white (for dark backgrounds)
  const isWhite = variant === "white";
  const primaryColor = isWhite ? "#FFFFFF" : "#7C3AED";
  const secondaryColor = isWhite ? "#E5E7EB" : "#6366F1";
  const textColor = isWhite ? "#FFFFFF" : "#1F2937";
  const taglineColor = isWhite ? "#D1D5DB" : "#6B7280";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon - House with Search */}
      <div className="relative">
        <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
          {/* House/Building */}
          <path
            d="M 24 6 L 8 18 L 8 38 L 18 38 L 18 28 L 30 28 L 30 38 L 40 38 L 40 18 Z"
            stroke={primaryColor}
            strokeWidth="2.5"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Door */}
          <rect
            x="20"
            y="30"
            width="8"
            height="8"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            rx="1"
          />
          {/* Window */}
          <rect
            x="12"
            y="22"
            width="6"
            height="6"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            rx="1"
          />
          <rect
            x="30"
            y="22"
            width="6"
            height="6"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            rx="1"
          />
          
          {/* Search Icon Overlay */}
          <circle
            cx="32"
            cy="16"
            r="8"
            stroke={secondaryColor}
            strokeWidth="2.5"
            fill="none"
          />
          <line
            x1="38"
            y1="22"
            x2="42"
            y2="26"
            stroke={secondaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Text Section */}
      <div className="flex flex-col">
        <span className={`text-2xl font-bold tracking-tight ${isWhite ? 'text-white' : 'text-gray-800'}`}>
          PG Finder
        </span>
        {showTagline && (
          <span className={`text-xs lowercase tracking-wide mt-0.5 ${isWhite ? 'text-gray-200' : 'text-gray-600'}`}>
            corporate living made easy
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;

