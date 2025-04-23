import { useNavigate } from 'react-router-dom';
import { useCart } from '../../utilities/hooks/useCart';
import useCartPageActions from '../../utilities/hooks/useCartPageActions';

const Cart = () => {
    const { cartItems, addItem, removeItem, getSubscriptionId, maxItems, clearCart } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    // Use the extracted hook for page actions
    const { handleCheckout, handleContinueShopping } = useCartPageActions(getSubscriptionId, navigate);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartCount > 0 && (
                <button
                    onClick={clearCart}
                    className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Clear Cart
                </button>
            )}
            <div className="mb-6">
                {cartCount > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((carpet, idx) => (
                            <li key={`${carpet.carpetID}-${idx}`} className="flex items-center py-4">
                                <img
                                    src={carpet.imgName ? `/images/${carpet.imgName}.jpg` : '/images/placeholder.jpg'}
                                    alt={carpet.name}
                                    className="w-16 h-16 object-cover rounded mr-4"
                                />
                                <div className="flex-1">
                                    <div className="font-semibold">{carpet.name}</div>
                                    <div className="text-gray-600 text-sm">{carpet.material} | {carpet.color} | {carpet.dimensions}</div>
                                    <div className="text-gray-500 text-xs">{carpet.descriptions}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => removeItem(carpet.carpetID)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >−</button>
                                    <span className="mx-2 text-lg">{carpet.quantity}</span>
                                    <button
                                        onClick={() => addItem(carpet)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                        disabled={cartCount >= maxItems}
                                    >+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg">Please add at least one carpet to your cart.</p>
                )}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleContinueShopping}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded"
                >
                    Continue Shopping
                </button>
                <button
                    onClick={handleCheckout}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                    disabled={cartCount === 0}
                >
                    Checkout
                </button>
            </div>
            <div className="mt-4">
                {cartCount > 0 && (
                    <p className="text-lg">
                        Your selected subscription will be:{" "}
                        {(cartCount === 1 && "Gold") ||
                            ((cartCount === 2 || cartCount === 3) && "Diamond") ||
                            ((cartCount === 4 || cartCount === 5) && "Platinum")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Cart;
