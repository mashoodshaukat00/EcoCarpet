import { useNavigate } from 'react-router-dom';
import { useCart } from '../../utilities/hooks/useCart';
import useCartPageActions from '../../utilities/hooks/useCartPageActions';
import { FaRegTrashAlt } from "react-icons/fa";
import clsx from "clsx";

const SUBSCRIPTIONS = [
    {
        id: 1,
        name: "Gold",
        description: "Best for 1 carpet. Basic subscription.",
        range: [1],
        color: "border-yellow-400 bg-yellow-50",
        highlight: "border-yellow-500 shadow-yellow-200"
    },
    {
        id: 2,
        name: "Diamond",
        description: "Best for 2-3 carpets. Premium subscription.",
        range: [2, 3],
        color: "border-blue-400 bg-blue-50",
        highlight: "border-blue-500 shadow-blue-200"
    },
    {
        id: 3,
        name: "Platinum",
        description: "Best for 4-5 carpets. Ultimate subscription.",
        range: [4, 5],
        color: "border-gray-400 bg-gray-50",
        highlight: "border-gray-500 shadow-gray-200"
    }
];

const getActiveSubscriptionId = (quantity) => {
    if (quantity === 1) return 1;
    if (quantity === 2 || quantity === 3) return 2;
    if (quantity === 4 || quantity === 5) return 3;
    return null;
};

const Cart = () => {
    const { cartItems, addItem, removeItem, getSubscriptionId, maxItems, clearCart } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    const { handleCheckout, handleContinueShopping, handleGoToProduct } = useCartPageActions(getSubscriptionId, navigate);
    const showAddOneMoreMsg = cartCount === 2 || cartCount === 4;
    const activeSubId = getActiveSubscriptionId(cartCount);

    return (
        <div className="container mx-auto p-2 sm:p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
            {/* Show max items message at the top */}
            {cartCount === maxItems && (
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-800 rounded text-center font-medium">
                    You have reached the maximum number of carpets (5) in your cart.
                </div>
            )}
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
                    <ul className="flex flex-col sm:flex-col gap-4">
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
            {/* Subscription Cards - only show if cartCount > 0 */}
            {cartCount > 0 && (
                <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    {SUBSCRIPTIONS.map(sub => (
                        <div
                            key={sub.id}
                            className={clsx(
                                "w-full sm:w-1/3 border-2 rounded-lg p-6 shadow transition-all duration-300",
                                sub.color,
                                activeSubId === sub.id
                                    ? `scale-105 ring-2 ring-offset-2 ${sub.highlight} shadow-lg`
                                    : "opacity-70"
                            )}
                            style={{ minWidth: 220, maxWidth: 340 }}
                        >
                            <div className="text-xl font-bold mb-2 text-center">{sub.name}</div>
                            <div className="text-gray-700 text-center mb-2">{sub.description}</div>
                            <div className="flex justify-center">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                                    {sub.range.length === 1
                                        ? `For ${sub.range[0]} item`
                                        : `For ${sub.range[0]}-${sub.range[1]} items`}
                                </span>
                            </div>
                            {activeSubId === sub.id && (
                                <div className="mt-4 text-center font-semibold text-green-700 animate-bounce">
                                    Selected
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {showAddOneMoreMsg && (
                <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded text-center font-medium">
                    You can add one more carpet to your cart at no additional cost.
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
        </div>
    );
};

export default Cart;
