const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white py-6 mt-10 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
                        <rect x="4" y="4" width="40" height="40" rx="10" fill="#059669" />
                        <ellipse cx="24" cy="24" rx="13" ry="8" fill="#D1FAE5" />
                        <ellipse cx="24" cy="20" rx="7" ry="3" fill="#10B981" />
                        <path d="M14 34c2-4 8-6 10-6s8 2 10 6" stroke="#065F46" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <circle cx="24" cy="24" r="3" fill="#065F46" />
                    </svg>
                    <span className="font-bold text-lg tracking-wide">EcoCarpet</span>
                </div>
                <div className="text-center text-sm text-emerald-100 flex flex-col gap-1">
                    <span>&copy; {new Date().getFullYear()} EcoCarpet. All rights reserved.</span>
                    <span>
                        Contact: <a href="mailto:info@ecocarpet.com" className="underline hover:text-emerald-200">info@ecocarpet.com</a> | Phone: <a href="tel:+4712345678" className="underline hover:text-emerald-200">+47 12 34 56 78</a>
                    </span>
                    <span>123 Green Street, Oslo, Norway</span>
                </div>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="/about" className="hover:underline hover:text-emerald-200 transition">About Us</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;