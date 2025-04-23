import { useState, useEffect } from 'react';

const CheckoutForm = () => {
    const [deliveryDetails, setDeliveryDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postcode: '',
        country: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem('registeredUserData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setDeliveryDetails({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                address: userData.address || '',
                city: userData.city || '',
                postcode: userData.postalCode || '',
                country: userData.country || '',
                email: userData.email || '',
                phone: userData.phoneNumber || '',
            });
        }
    }, []);
    const [cartItems] = useState([
        { id: 1, name: 'Persian Silk Rug', quantity: 1, imgName: 'persian_silk_rug'},
        { id: 2, name: 'Modern Geometric', quantity: 1, imgName: 'modern_geometric' },
        { id: 3, name: 'Shaggy Area Rug', quantity: 1, imgName: 'shaggy_area_rug' },
        { id: 4, name: 'Moroccan Trellis', quantity: 1, imgName: 'moroccan_trellis' },
        // ... more items
    ]);
    const handleSubmitCheckout = (e) => {
        e.preventDefault();
        console.log('Checkout data:', deliveryDetails);
        alert('Checkout submitted!');
        localStorage.removeItem('registeredUserData');
    };
    const handleCheckout = () => {
       
    };

    return (
        <div className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmitCheckout} className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-8">                   
                    <div className="lg:order-1">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h2>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={deliveryDetails.email}
                                readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country/Region</label>
                            <input
                                id="country"
                                name="country"
                                value={deliveryDetails.country}
                                readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           >                              
                            </input>
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={deliveryDetails.firstName}
                               readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={deliveryDetails.lastName}
                               readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={deliveryDetails.address}
                               readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                         <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={deliveryDetails.city}
                               readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Postcode</label>
                            <input
                                type="text"
                                name="postcode"
                                id="postcode"
                                value={deliveryDetails.postcode}
                               readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={deliveryDetails.phone}
                              readOnly
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button onClick={handleCheckout} className="mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                        >
                           Proceed
                        </button>
                    </div>

                      <div className="lg:order-2">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                        {/* ... your order summary items here ... */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Items in Your Cart</h3>
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                                        <img

                                            src={`/images/${item.imgName}.jpg`}
                                            alt={item.name}
                                            className="w-15 h-15 object-cover mt-4 rounded-lg"
                                        />
                                        <span className="font-medium text-gray-800">{item.name}</span>
                                        <span className="text-gray-600">Qty: {item.quantity}</span>
                                            </li>
                                ))}
                            </ul>
                        </div>
                                     
                        
                        <button
                            type="submit"
                            className="mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                        >
                            Continue to Checkout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;