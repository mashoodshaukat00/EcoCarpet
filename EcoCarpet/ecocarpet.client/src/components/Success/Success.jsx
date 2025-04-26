import { Link } from "react-router-dom";

const Success = () => (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-16 flex flex-col items-center">
        <svg className="w-20 h-20 text-emerald-500 mb-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-3xl font-extrabold text-emerald-800 mb-4 text-center">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
            Thank you for your order. Your payment has been processed and your subscription is now active.
        </p>
        <Link
            to="/products"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
            Continue Shopping
        </Link>
    </div>
);

export default Success;
