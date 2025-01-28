import { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PasswordHash: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data before submission:', formData);
        try {
            const response = await fetch('https://localhost:7036/api/Customers/Register', {  // Change URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log('Fetch response:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Response:', response);
            console.log('Response data:', data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="FirstName"
                placeholder="First Name"
                value={formData.FirstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="LastName"
                placeholder="Last Name"
                value={formData.LastName}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="PasswordHash"
                placeholder="Password"
                value={formData.PasswordHash}
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
