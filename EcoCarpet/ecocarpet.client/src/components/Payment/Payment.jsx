import { useNavigate } from "react-router-dom";
import usePaymentForm from "../../utilities/hooks/usePaymentForm";

const Payment = () => {
    const navigate = useNavigate();
    const { card, error, handleChange, handleSubmit } = usePaymentForm(navigate);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-extrabold text-emerald-800 mb-8 text-center tracking-tight">Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={card.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="Name on card"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="number">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={card.number}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="expiry">
                            Expiry (MM/YY)
                        </label>
                        <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={card.expiry}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="cvc">
                            CVC
                        </label>
                        <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            value={card.cvc}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="CVC"
                            maxLength={4}
                            required
                        />
                    </div>
                </div>
                {error && (
                    <div className="text-red-600 text-sm text-center">{error}</div>
                )}
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow transition"
                    >
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
