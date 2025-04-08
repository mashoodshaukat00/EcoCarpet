// src/components/RegistrationForm.jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Helper hook to parse query parameters.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const RegistrationForm = () => {
    const query = useQuery();
    const subscriptionIdFromQuery = query.get('subscriptionID') || 1;
    console.log('Subscription ID from query:', subscriptionIdFromQuery);

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Address: '',
        City: '',
        Country: '',
        PostalCode: '',
        PhoneNumber: '',
        PasswordHash: '',
        subscriptionID: subscriptionIdFromQuery, // Pre-populated from query parameter.
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data before submission:', formData);
        try {
            const response = await fetch(`${apiUrl}/Users/Register`, {
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
        <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">First Name</label>
                        <input type="text"
                            name="FirstName"
                            placeholder="First Name"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Last Name</label>
                        <input
                            type="text"
                            name="LastName"
                            placeholder="Last Name"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Email</label>
                        <input type="email"
                            name="Email"
                            placeholder="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Phone Number</label>
                        <input type="tel"
                            name="PhoneNumber"
                            placeholder="Phone Number"
                            pattern="[0-9]{8}"
                            title="Eight digit phone number"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Address</label>
                        <input type="text"
                            name="Address"
                            placeholder="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">City</label>
                        <input type="text"
                            name="City"
                            placeholder="City"
                            value={formData.City}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Postal Code</label>
                        <input type="tel"
                            name="PostalCode"
                            placeholder="PostalCode"
                            pattern="[0-9]{4}"
                            title="Four digit postal code"
                            value={formData.PostalCode}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Country</label>
                        <input type="text"
                            name="Country"
                            placeholder="Country"
                            value={formData.Country}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-gray-700 font-medium mb-2">Password</label>
                        <input type="password"
                            name="PasswordHash"
                            placeholder="Password"
                            value={formData.PasswordHash}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                    </div>
                </div>
                {/* Hidden Field for SubscriptionID (pre-populated) */}
                <input type="hidden" onChange={handleChange} name="subscriptionID" value={formData.subscriptionID} />
                <button type="submit" className="mt-6 w-64 bg-yellow-500 text-black py-2 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
