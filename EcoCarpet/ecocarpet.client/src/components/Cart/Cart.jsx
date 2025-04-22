import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// this is just a sample page for backend testing
// this is just a sample page for backend testing
// this is just a sample page for backend testing

const Cart = () => {
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const maxItems = 5;

    const addItem = () => {
        if (cartCount < maxItems) {
            setCartCount(cartCount + 1);
        }
    };

    const removeItem = () => {
        if (cartCount > 0) {
            setCartCount(cartCount - 1);
        }
    };

    // Determine subscription based on cart count.
    const getSubscriptionId = () => {
        if (cartCount === 1) return 1;
        if (cartCount === 2 || cartCount === 3) return 2;
        if (cartCount === 4 || cartCount === 5) return 3;
        return null;
    };

    const handleCheckout = () => {
        const subscriptionID = getSubscriptionId();
        if(subscriptionID === null){
            alert("Please add at least one carpet to your cart.");
            return;
        } 
        else{
            navigate(`/signup?subscriptionID=${subscriptionID}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="flex items-center space-x-4">
                <button onClick={removeItem} className="bg-red-500 text-white px-4 py-2 rounded">−</button>
                <span className="text-xl">{cartCount} {cartCount === 1 ? "item" : "items"}</span>
                <button onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded">+</button>
            </div>
            <div className="mt-4">
                {cartCount > 0 ? (
                    <p className="text-lg">
                        Your selected subscription will be:{" "}
                        {(cartCount === 1 && "Gold") ||
                            ((cartCount === 2 || cartCount === 3) && "Diamond") ||
                            ((cartCount === 4 || cartCount === 5) && "Platinum")}
                    </p>
                ) : (
                    <p className="text-lg">Please add at least one carpet to your cart.</p>
                )}
            </div>
            <button onClick={handleCheckout} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">
                Checkout
            </button>
        </div>
    );
}
export default Cart;
