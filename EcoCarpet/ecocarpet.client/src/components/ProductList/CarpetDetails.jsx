import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CarpetDetails() {
    const { id } = useParams(); // 🔹 Henter ID fra URL-en
    const [carpet, setCarpet] = useState(null);

    useEffect(() => {
        console.log(`Fetching details for carpet ID: ${id}`); // ✅ Debugging
        const fetchCarpetDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7036/api/Carpet/${id}`);
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
    }, [id]);

    if (!carpet) {
        return <p className="text-center text-gray-600">Loading carpet details...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">{carpet.name}</h1>
            <img
                src={carpet.imageUrl || "https://www.flooringsuperstore.com/media/catalog/product/cache/293b85e20f7172310ee4e8f824e7e68c/a/l/allure_-_rioja_cameo.jpg"}
                alt={carpet.name}
                className="w-full h-64 object-cover mt-4 rounded-lg"
            />
            <p className="text-gray-700 mt-2"><strong>Material:</strong> {carpet.material}</p>
            <p className="text-gray-700"><strong>Color:</strong> {carpet.color}</p>
            <p className="text-gray-700"><strong>Description:</strong> {carpet.descriptions}</p>
        </div>
    );
}

export default CarpetDetails;
