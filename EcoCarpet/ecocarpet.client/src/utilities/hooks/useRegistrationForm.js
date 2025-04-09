import { useState } from 'react';

const useRegistrationForm = () => {
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
                console.error('Error details:', errorData);
                throw new Error('Registration failed');
            }

            const data = await response.json();
            alert('Registration successful!');
            console.log('Response data:', data);
        } catch (error) {
            console.error('There was a problem with the registration:', error);
            alert('Failed to register. Please try again later.');
        }
    };

    return { formData, handleChange, handleSubmit };
};

export default useRegistrationForm;
