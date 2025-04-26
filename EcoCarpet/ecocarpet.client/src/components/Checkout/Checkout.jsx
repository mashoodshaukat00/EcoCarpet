import { useCart } from '../../utilities/hooks/useCart';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSubscriptions from '../../utilities/hooks/useSubscriptions';

const getActiveSubscription = (subscriptions, subscriptionID) => {
    return subscriptions.find(sub => sub.subscriptionID === Number(subscriptionID));
};

const Checkout = () => {
    const { cartItems } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const { subscriptions, loading: subsLoading, error: subsError } = useSubscriptions();
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        if (location.state && location.state.customer) {
            setCustomer(location.state.customer);
        } else {
            navigate('/signup');
        }
    }, [location, navigate]);

    useEffect(() => {
        if (customer && subscriptions.length > 0) {
            setSubscription(getActiveSubscription(subscriptions, customer.subscriptionID));
        }
    }, [customer, subscriptions]);

    if (!customer || subsLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="text-blue-700 font-semibold">Loading checkout....</span>
            </div>
        );
    }

    if (subsError) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="text-red-700 font-semibold">Failed to load subscription info.</span>
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="text-red-700 font-semibold">Subscription not found.</span>
            </div>
        );
    }

    // Calculate total price (subscription only, as per your logic)
    const totalPrice = subscription.annualFee || subscription.price;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-extrabold text-emerald-800 mb-8 text-center tracking-tight">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div className="bg-emerald-50 rounded-xl p-6 shadow">
                    <h3 className="text-xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
                        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Delivery Information
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <div><span className="font-semibold">Name:</span> {customer.FirstName} {customer.LastName}</div>
                        <div><span className="font-semibold">Email:</span> {customer.Email}</div>
                        <div><span className="font-semibold">Address:</span> {customer.Address}</div>
                        <div><span className="font-semibold">City:</span> {customer.City}</div>
                        <div><span className="font-semibold">Postal Code:</span> {customer.PostalCode}</div>
                        <div><span className="font-semibold">Country:</span> {customer.Country}</div>
                        <div><span className="font-semibold">Phone:</span> {customer.PhoneNumber}</div>
                    </div>
                </div>
                {/* Subscription Info */}
                <div className="bg-emerald-50 rounded-xl p-6 shadow flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
                            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m4-4H8" /></svg>
                            Your Subscription Plan
                        </h3>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-lg text-emerald-800">{subscription.planName || subscription.name}</span>
                            <span className="text-gray-700">{subscription.description}</span>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Subscription Price:</span>
                        <span className="font-bold text-xl text-emerald-700">{subscription.annualFee || subscription.price} NOK / year</span>
                    </div>
                </div>
            </div>
            {/* Cart Items */}
            <div className="mt-10">
                <h3 className="text-xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
                    Your Carpets
                </h3>
                <ul className="divide-y divide-gray-200">
                    {cartItems.map((item, idx) => (
                        <li key={`${item.carpetID}-${idx}`} className="flex items-center py-4">
                            <img
                                src={item.imgName ? `/images/${item.imgName}.jpg` : '/images/placeholder.jpg'}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg border mr-4"
                            />
                            <div className="flex-1">
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-gray-600 text-sm">{item.material} | {item.color} | {item.dimensions}</div>
                                <div className="text-gray-500 text-xs">{item.descriptions}</div>
                            </div>
                            <div className="ml-4 text-gray-700 font-semibold">Qty: {item.quantity}</div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Total */}
            <div className="mt-10 flex justify-end items-center">
                <div className="text-xl font-bold text-emerald-800">
                    Total: <span className="ml-2">{totalPrice} NOK</span>
                </div>
            </div>
            {/* Place Order Button */}
            <div className="flex justify-end mt-6">
                <Link
                    to="/payment"
                    state={{ customer, subscription }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow transition text-center"
                >
                    Proceed to Payment
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
