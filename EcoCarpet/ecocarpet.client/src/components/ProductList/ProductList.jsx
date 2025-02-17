import  { useState, useEffect } from 'react';

function CarpetList() {
    const [carpets, setCarpets] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);     // Add error state

    useEffect(() => {
        const fetchCarpets = async () => {
            try {
                const response = await fetch('https://localhost:7036/api/Carpet',); // Your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Improved error handling
                }
                const data = await response.json();
                setCarpets(data);
            } catch (err) {
                setError(err); // Set the error state
                console.error('Error fetching carpets:', err);
            } finally {
                setLoading(false); // Set loading to false regardless of success/failure
            }
        };

        fetchCarpets();
    }, []);

    if (loading) {
        return <div>Loading carpets...</div>; // Display loading message
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

    return (
        //<div>
        //    <h1>Product List</h1>
        //    <table>  Use a table for better structure
        //        <thead>
        //            <tr>
        //                <th>Name</th>
        //                <th>Material</th>
        //                <th>Dimensions</th>
        //                <th>Color</th>
        //                <th>Descriptions</th>
        //                <th>Available Stock</th>
        //                <th>Status</th>
        //                <th>Added Date</th>
        //            </tr>
        //        </thead>
        //        <tbody>
        //            {carpets.map(carpet => (
        //                <tr key={carpet.carpetID}>  Important: Add a unique key
        //                    <td>{carpet.name}</td>
        //                    <td>{carpet.material}</td>
        //                    <td>{carpet.dimensions}</td>
        //                    <td>{carpet.color}</td>
        //                    <td>{carpet.descriptions}</td>
        //                    <td>{carpet.availableStock}</td>
        //                    <td>{carpet.status}</td>
        //                    <td>{new Date(carpet.addedDate).toLocaleString()}</td>  Format the date
        //                </tr>
        //            ))}
        //        </tbody>
        //    </table>
        //</div>
        <div className="container mx-auto w-9/10 max-w-7xl mt-8">
            <div className="flex flex-wrap justify-center">
                {carpets.map((carpet) => (
                    <div className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 px-4 mb-4" key={carpet.carpetID || carpet.id}> {/* Use carpetID or id */}
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                            <img
                                src={carpet.imageUrl || "https://www.flooringsuperstore.com/media/catalog/product/cache/293b85e20f7172310ee4e8f824e7e68c/a/l/allure_-_rioja_cameo.jpg"}
                                alt={carpet.name || "Carpet Image"}
                                className="w-full max-h-56 object-cover rounded-t-lg mb-4"
                            />
                            <h3>{carpet.name}</h3>
                            <p className="text-gray-700">{carpet.descriptions}</p>
                            <div className="buttons w-full flex justify-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    View Product
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarpetList;