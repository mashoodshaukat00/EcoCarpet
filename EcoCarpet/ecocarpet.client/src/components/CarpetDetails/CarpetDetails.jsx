import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../utilities/hooks/useCart.jsx";
import useCarpetDetails from "../../utilities/hooks/useCarpetDetails";

function CarpetDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem, maxItems, cartItems } = useCart();
    const { carpet, loading, error } = useCarpetDetails(id);

    const handleAddToCart = () => {
        if (cartItems.length >= maxItems) {
            alert("You cannot add more than 5 carpets to the cart.");
            return;
        }
        addItem(carpet);
        navigate("/cart");
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading carpet details...</p>;
    }
    if (error) {
        return <p className="text-center text-red-600">Error: {error}</p>;
    }
    if (!carpet) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">{carpet.name}</h1>
            <img
                src={`/images/${carpet.imgName}.jpg`}
                alt={carpet.name}
                className="w-full h-64 object-cover mt-4 rounded-lg"
            />
            <p className="text-gray-700 mt-2"><strong>Material:</strong> {carpet.material}</p>
            <p className="text-gray-700"><strong>Color:</strong> {carpet.color}</p>
            <p className="text-gray-700"><strong>Description:</strong> {carpet.descriptions}</p>
            <p className="text-gray-700"><strong>Available Stock:</strong> {carpet.availableStock}</p>
            <p className="text-gray-700"><strong>Dimensions:</strong> {carpet.dimensions}</p>
            <p className="text-gray-700"><strong>Carpet Id:</strong> {carpet.carpetID}</p>
            <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={cartItems.length >= maxItems}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default CarpetDetails;
