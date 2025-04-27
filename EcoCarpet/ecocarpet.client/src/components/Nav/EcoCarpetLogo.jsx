const EcoCarpetLogo = () => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 mr-2 drop-shadow-lg"
        style={{ minWidth: 40, minHeight: 40 }}
        aria-label="EcoCarpet Logo"
    >
        <rect x="4" y="4" width="40" height="40" rx="10" fill="#059669" />
        <ellipse cx="24" cy="24" rx="13" ry="8" fill="#D1FAE5" />
        <ellipse cx="24" cy="20" rx="7" ry="3" fill="#10B981" />
        <path d="M14 34c2-4 8-6 10-6s8 2 10 6" stroke="#065F46" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="24" cy="24" r="3" fill="#065F46" />
        <text x="24" y="44" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold" fontFamily="Arial">EcoCarpet</text>
    </svg>
);

export default EcoCarpetLogo;
