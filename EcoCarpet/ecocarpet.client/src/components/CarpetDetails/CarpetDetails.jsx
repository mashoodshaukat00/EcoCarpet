import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../utilities/hooks/useCart.jsx";
import useCarpetDetails from "../../utilities/hooks/useCarpetDetails";
import Carousel from "../Carousel/Carousel";

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
        <>
            <div className="max-w-7xl mx-auto p-6 mt-10 flex flex-col md:flex-row items-center bg-transparent shadow-none rounded-none">
                <div className="flex-1 flex justify-center items-center md:mr-20 mb-8 md:mb-0">
                    <img
                        src={`/images/${carpet.imgName}.jpg`}
                        alt={carpet.name}
                        className="w-full max-w-lg h-[28rem] object-contain"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-3xl font-extrabold text-emerald-800 mb-4 tracking-tight">{carpet.name}</h1>
                    <div className="space-y-2 text-gray-700 text-lg">
                        <div><span className="font-semibold">Material:</span> {carpet.material}</div>
                        <div><span className="font-semibold">Color:</span> {carpet.color}</div>
                        <div><span className="font-semibold">Description:</span> {carpet.descriptions}</div>
                        <div><span className="font-semibold">Available Stock:</span> {carpet.availableStock}</div>
                        <div><span className="font-semibold">Dimensions:</span> {carpet.dimensions}</div>
                        <div><span className="font-semibold">Carpet Id:</span> {carpet.carpetID}</div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition text-lg"
                        disabled={cartItems.length >= maxItems}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="py-10 mt-6 bg-gray-100">
                <h1 className="text-3xl font-extrabold text-emerald-800 text-center">Related Products</h1>
                <Carousel />
            </div>
        </>
    );
}

export default CarpetDetails;
