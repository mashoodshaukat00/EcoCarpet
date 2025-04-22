import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CarpetDetails() {
    const { id } = useParams();
    const [carpet, setCarpet] = useState(null);
    const navigate = useNavigate();

    // environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCarpetDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/Carpet/${id}`);
                if (!response.ok) {
                    throw new Error("Carpet not found");
                }
                const data = await response.json();
                setCarpet(data);
            } catch (error) {
                console.error("Error fetching carpet details:", error);
            }
        };

        if (id) fetchCarpetDetails();
    }, [apiUrl, id]);

    const handleAddToCart = () => {
        // Add carpet to cart logic (e.g., save to localStorage or make an API call)
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(carpet);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Navigate to the cart page
        navigate("/cart");
    };

    if (!carpet) {
        return <p className="text-center text-gray-600">Loading carpet details...</p>;
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
            >
                Add to Cart
            </button>
        </div>
    );
}

export default CarpetDetails;
