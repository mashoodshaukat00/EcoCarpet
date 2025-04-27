import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogoutClick = () => {
        setLoggingOut(true);
        onLogout();
        setTimeout(() => {
            setLoggingOut(false);
            navigate("/", { state: { loggedOut: true } });
        }, 1200);
    };

    return (
        <button
            className="hover:underline hover:cursor-pointer px-4 py-2 rounded transition bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            onClick={handleLogoutClick}
            disabled={loggingOut}
        >
            {loggingOut ? "Logging out..." : "Logout"}
        </button>
    );
};
Logout.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Logout;
