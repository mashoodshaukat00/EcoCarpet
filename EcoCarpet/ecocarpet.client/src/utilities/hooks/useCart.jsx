import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const maxItems = 5;
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (carpet) => {
        setCartItems((prev) => {
            // Count total quantity if this item is added
            const totalQuantity = prev.reduce((sum, item) => sum + item.quantity, 0);
            if (totalQuantity >= maxItems) return prev;

            const idx = prev.findIndex(item => item.carpetID === carpet.carpetID);
            if (idx !== -1) {
                // Update quantity for existing item
                return prev.map((item, i) =>
                    i === idx
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                return [...prev, { ...carpet, quantity: 1 }];
            }
        });
    };

    const removeItem = (carpetID) => {
        setCartItems((prev) =>
            prev
                .map(item =>
                    item.carpetID === carpetID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => !(item.carpetID === carpetID && item.quantity <= 0))
        );
    };

    const clearCart = () => setCartItems([]);

    const getSubscriptionId = () => {
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (totalQuantity === 1) return 1;
        if (totalQuantity === 2 || totalQuantity === 3) return 2;
        if (totalQuantity === 4 || totalQuantity === 5) return 3;
        return null;
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            clearCart,
            getSubscriptionId,
            maxItems
        }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
