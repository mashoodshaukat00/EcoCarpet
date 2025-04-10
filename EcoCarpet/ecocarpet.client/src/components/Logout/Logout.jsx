import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/login");
        alert("Logged out successfully!");
    };

    return (
        <button className="hover:underline hover:cursor-pointer" onClick={handleLogoutClick}>
            Logout
        </button>
    );
};
Logout.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Logout;
