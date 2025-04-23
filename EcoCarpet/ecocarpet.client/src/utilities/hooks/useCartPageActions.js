import { useCallback } from 'react';

const useCartPageActions = (getSubscriptionId, navigate) => {
    const handleCheckout = useCallback(() => {
        const subscriptionID = getSubscriptionId();
        if (subscriptionID === null) {
            alert("Please add at least one carpet to your cart.");
            return;
        }
        navigate(`/signup?subscriptionID=${subscriptionID}`);
    }, [getSubscriptionId, navigate]);

    const handleContinueShopping = useCallback(() => {
        navigate('/products');
    }, [navigate]);

    return { handleCheckout, handleContinueShopping };
};

export default useCartPageActions;
