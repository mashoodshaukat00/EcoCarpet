import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

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

    const loginMutation = useMutation({
        mutationFn: async (loginData) => {
            const response = await fetch(`${apiUrl}/Users/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (data.user && data.user.userID) {
                localStorage.setItem('userId', data.user.userID.toString());
                alert('Logged in successfully!');
                onLogin();
                navigate('/products');
            } else {
                alert('Cannot fetch userId from the server.');
            }
        },
        onError: (error) => {
            console.error('There was a problem with the login:', error.message);
            alert('Failed to login. Please try again later.');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(loginData);
    };

    return {
        loginData,
        handleChange,
        handleSubmit,
        isLoading: loginMutation.status === 'pending' || loginMutation.isPending
    };
};

export default useLoginForm;
