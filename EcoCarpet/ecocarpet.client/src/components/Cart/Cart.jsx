import { useNavigate } from 'react-router-dom';
import { useCart } from '../../utilities/hooks/useCart';
import useCartPageActions from '../../utilities/hooks/useCartPageActions';
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
    const { cartItems, addItem, removeItem, getSubscriptionId, maxItems, clearCart } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    const { handleCheckout, handleContinueShopping, handleGoToProduct } = useCartPageActions(getSubscriptionId, navigate);
    const showAddOneMoreMsg = cartCount === 2 || cartCount === 4;

    return (
        <div className="container mx-auto p-2 sm:p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
            {cartCount > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={clearCart}
                        className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2"
                        aria-label="Clear Cart"
                    >
                        <FaRegTrashAlt className="text-lg" />
                        <span className="sr-only">Clear Cart</span>
                    </button>
                </div>
            )}
            <div className="mb-6">
                {cartCount > 0 ? (
                    <ul className="flex flex-col gap-4">
                        {cartItems.map((carpet, idx) => (
                            <li
                                key={`${carpet.carpetID}-${idx}`}
                                className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow p-4 gap-4"
                            >
                                <div
                                    className="flex-shrink-0 flex items-center justify-center w-full sm:w-auto cursor-pointer"
                                    onClick={() => handleGoToProduct(carpet.carpetID)}
                                    title="View product details"
                                >
                                    <img
                                        src={carpet.imgName ? `/images/${carpet.imgName}.jpg` : '/images/placeholder.jpg'}
                                        alt={carpet.name}
                                        className="w-28 h-28 object-cover rounded-lg border"
                                    />
                                </div>
                                <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
                                    <div
                                        className="font-semibold text-lg cursor-pointer hover:underline"
                                        onClick={() => handleGoToProduct(carpet.carpetID)}
                                        title="View product details"
                                    >
                                        {carpet.name}
                                    </div>
                                    <div className="text-gray-600 text-sm mt-1">{carpet.material} | {carpet.color} | {carpet.dimensions}</div>
                                    <div className="text-gray-500 text-xs mt-1">{carpet.descriptions}</div>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-2 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => removeItem(carpet.carpetID)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                                        aria-label="Decrease quantity"
                                    >−</button>
                                    <span className="mx-2 text-lg font-semibold min-w-[2rem] text-center">{carpet.quantity}</span>
                                    <button
                                        onClick={() => addItem(carpet)}
                                        className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                                        disabled={cartCount >= maxItems}
                                        aria-label="Increase quantity"
                                    >+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg text-center">Please add at least one carpet to your cart.</p>
                )}
            </div>
            {showAddOneMoreMsg && (
                <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded text-center font-medium">
                    You can add one more item to your cart at no additional cost.
                </div>
            )}
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={handleContinueShopping}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded w-full sm:w-auto transition"
                >
                    Continue Shopping
                </button>
                <button
                    onClick={handleCheckout}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full sm:w-auto transition"
                    disabled={cartCount === 0}
                >
                    Checkout
                </button>
            </div>
            <div className="mt-4 text-center">
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
