import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRegistrationForm = () => {

    // Helper hook to parse query parameters.
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const subscriptionIdFromQuery = query.get('subscriptionID');

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Address: '',
        City: '',
        PostalCode: '',
        Country: '',
        PhoneNumber: '',
        PasswordHash: '',
        subscriptionID: subscriptionIdFromQuery,
    });

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/Users/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.Title || 'Unknown error'}`);
                return { success: false };
            }
            // On success, return customer info for checkout
            return { success: true, customer: formData };
        } catch (error) {
            console.error('There was a problem with the registration:', error.message);
            alert('Failed to register. Please try again later.');
            return { success: false };
        }
    };

    const handleSubmitWithCheckout = async (e, navigate) => {
        const result = await handleSubmit(e);
        if (result && result.success) {
            navigate('/checkout', { state: { customer: result.customer } });
        }
    };

    return { formData, handleChange, handleSubmit, handleSubmitWithCheckout };
};

export default useRegistrationForm;
