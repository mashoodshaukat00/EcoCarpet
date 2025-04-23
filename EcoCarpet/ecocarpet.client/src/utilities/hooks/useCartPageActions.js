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

    const handleGoToProduct = (carpetID) => {
        navigate(`/products/${carpetID}`);
    };

    return { handleCheckout, handleContinueShopping, handleGoToProduct };
};

export default useCartPageActions;
