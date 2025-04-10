import { useState } from 'react';

const useLoginForm = (onLogin, navigate, apiUrl) => {
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/Users/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            if (data.user && data.user.userID) {
                localStorage.setItem('userId', data.user.userID.toString());
                alert('Logged in successfully!');
                onLogin();
                navigate('/products');
            } else {
                alert('Cannot fetch userId from the server.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to login. Please try again later.');
        }
    };

    return { loginData, handleChange, handleSubmit };
};

export default useLoginForm;
