import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useLoginForm from '../../utilities/hooks/useLoginForm';

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const { loginData, handleChange, handleSubmit, isLoading } = useLoginForm(onLogin, navigate, apiUrl);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-50">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md mt-10 border border-emerald-200">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-emerald-100 rounded-full p-3 mb-2 shadow">
                        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#059669" />
                            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill="#D1FAE5"/>
                            <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#10B981"/>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-emerald-800 text-center mb-2 tracking-tight">Sign In</h2>
                    <p className="text-gray-500 text-center">Welcome back to EcoCarpet</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="Email"
                            placeholder="Enter your email"
                            value={loginData.Email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="Password"
                            placeholder="Enter your password"
                            value={loginData.Password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 text-lg shadow"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <span className="text-gray-600">Do not have an account? </span>
                    <a href="/signup" className="text-emerald-700 font-semibold hover:underline">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
