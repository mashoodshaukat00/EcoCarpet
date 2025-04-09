import { useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
    };

    return { isAuthenticated, handleLogin, handleLogout };
};

export default useAuth;
