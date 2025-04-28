import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../../utilities/hooks/useCart";
import EcoCarpetLogo from "./EcoCarpetLogo";

const Nav = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white shadow">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <EcoCarpetLogo />
                    <span className="text-2xl font-extrabold tracking-wide text-white select-none">EcoCarpet</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link
                        to="/subscriptions"
                        className="text-lg font-semibold hover:text-emerald-300 transition"
                    >
                        Subscriptions
                    </Link>
                    <button
                        className="relative"
                        onClick={() => navigate("/cart")}
                        aria-label="View cart"
                    >
                        <FaShoppingCart className="text-2xl hover:text-emerald-300 transition" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {/* Auth/Profile */}
                    <div className="relative" ref={dropdownRef}>
                        {isAuthenticated ? (
                            <>
                                <button
                                    className="ml-4 hover:text-emerald-300 transition"
                                    aria-label="Account"
                                    onClick={() => setShowDropdown((prev) => !prev)}
                                >
                                    <FaUserCircle className="text-2xl" />
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-4 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50 py-2">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-emerald-100 transition"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-emerald-100 transition"
                                            onClick={() => {
                                                setShowDropdown(false);
                                                onLogout();
                                                setTimeout(() => {
                                                    navigate("/", { state: { loggedOut: true } });
                                                }, 100);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <button
                                className="ml-4 hover:text-emerald-300 transition"
                                onClick={() => navigate("/login")}
                                aria-label="Login"
                            >
                                <FaUserCircle className="text-2xl" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

Nav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Nav;


