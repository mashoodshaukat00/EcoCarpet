import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const useRegistrationForm = () => {

// Helper hook to parse query parameters.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const query = useQuery();
    const subscriptionIdFromQuery = query.get('subscriptionID');
    const navigate = useNavigate();   
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
                return;
            }
            // --- HINT: Store user data in local storage after successful registration ---
            const userData = {
                firstName: formData.FirstName,
                lastName: formData.LastName,
                email: formData.Email,
                address: formData.Address,
                city: formData.City,
                postalCode: formData.PostalCode,
                country: formData.Country,
                phoneNumber: formData.PhoneNumber,
                // Add other relevant data if needed
            };
            localStorage.setItem('registeredUserData', JSON.stringify(userData));

            // --- HINT: Navigate to your checkout page after successful registration ---
            navigate('/checkout'); // Replace '/checkout' with the actual path to your checkout page
            console.log('Registration successful!'); // Optional success message
        } catch (error) {
            console.error('There was a problem with the registration:', error.message);
            alert('Failed to register. Please try again later.');
        }
    };

    return { formData, handleChange, handleSubmit };
};

export default useRegistrationForm;
