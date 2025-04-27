import { useState } from "react";

const usePaymentForm = (onSuccess) => {
    const [card, setCard] = useState({
        name: "",
        number: "",
        expiry: "",
        cvc: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateCard = () => {
        if (!card.name || !card.number || !card.expiry || !card.cvc) {
            setError("Please fill in all fields.");
            return false;
        }
        if (!/^\d{16}$/.test(card.number.replace(/\s/g, ""))) {
            setError("Card number must be 16 digits.");
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
            setError("Expiry must be in MM/YY format.");
            return false;
        }
        if (!/^\d{3,4}$/.test(card.cvc)) {
            setError("CVC must be 3 or 4 digits.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCard()) {
            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 800);
        }
    };

    return { card, error, handleChange, handleSubmit };
};

export default usePaymentForm;
