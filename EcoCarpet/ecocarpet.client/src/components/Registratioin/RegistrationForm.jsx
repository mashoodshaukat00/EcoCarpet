// src/components/RegistrationForm.jsx
import useRegistrationForm from '../../utilities/hooks/useRegistrationForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utilities/hooks/useAuth';

const RegistrationForm = () => {
    const { formData, handleChange, handleSubmitWithCheckout } = useRegistrationForm();
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    // Wrap the original handleSubmitWithCheckout to also log in the user
    const handleSubmitAndLogin = async (e) => {
        const result = await handleSubmitWithCheckout(e, navigate);
        if (result && result.success) {
            handleLogin();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-50">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg mt-10 border border-emerald-200">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-emerald-100 rounded-full p-3 mb-2 shadow">
                        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#059669" />
                            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill="#D1FAE5"/>
                            <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#10B981"/>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-emerald-800 text-center mb-2 tracking-tight">Create Account</h2>
                    <p className="text-gray-500 text-center">Join EcoCarpet for a sustainable future</p>
                </div>
                <form onSubmit={handleSubmitAndLogin} className="space-y-5">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                name="FirstName"
                                placeholder="First name"
                                value={formData.FirstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="LastName"
                                placeholder="Last name"
                                value={formData.LastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="Email"
                            placeholder="Enter your email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                        />
                    </div>                   
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            name="Address"
                            placeholder="Enter your address"
                            value={formData.Address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="City"
                                placeholder="City"
                                value={formData.City}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                                Postal Code
                            </label>
                            <input
                                id="postalCode"
                                type="text"
                                name="PostalCode"
                                placeholder="Postal code"
                                value={formData.PostalCode}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                name="Country"
                                placeholder="Country"
                                value={formData.Country}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                type="text"
                                name="PhoneNumber"
                                placeholder="Phone number"
                                value={formData.PhoneNumber}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="PasswordHash"
                            placeholder="Enter your password"
                            value={formData.PasswordHash}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                        />
                    </div>
                    {/* Hidden Field for SubscriptionID (pre-populated) */}
                    <input type="hidden" onChange={handleChange} name="subscriptionID" value={formData.subscriptionID} />
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 text-lg shadow"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-6">
                    <span className="text-gray-600">Already have an account? </span>
                    <a href="/login" className="text-emerald-700 font-semibold hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
