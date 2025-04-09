import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logout from "../Logout/Logout";

const Nav = ({ isAuthenticated, onLogout }) => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-2" />
                    <div className="text-xl font-bold"><Link to="/" className="hover:underline">EcoCarpet</Link></div>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        {isAuthenticated ? (
                            <Logout onLogout={onLogout} />
                        ) : (
                            <Link to="/login" className="hover:underline">Login</Link>
                        )}
                    </li>
                    <li><Link to="/signup" className="hover:underline">Signup</Link></li>
                    <li><Link to="/products" className="hover:underline">Products</Link></li>
                    <li><Link to="/subscriptions" className="hover:underline">Subscriptions</Link></li>
                    <li><Link to="*" className="hover:underline">About us</Link></li>                    
                </ul>
            </nav>                   
        </header>
    );
};
Nav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Nav;


