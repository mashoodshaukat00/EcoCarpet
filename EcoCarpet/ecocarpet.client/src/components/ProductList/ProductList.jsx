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
        <div>
            <h1>Product List</h1>
            <table> {/* Use a table for better structure */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Material</th>
                        <th>Dimensions</th>
                        <th>Color</th>
                        <th>Descriptions</th>
                        <th>Available Stock</th>
                        <th>Status</th>
                        <th>Added Date</th>
                    </tr>
                </thead>
                <tbody>
                    {carpets.map(carpet => (
                        <tr key={carpet.carpetID}> {/* Important: Add a unique key */}
                            <td>{carpet.name}</td>
                            <td>{carpet.material}</td>
                            <td>{carpet.dimensions}</td>
                            <td>{carpet.color}</td>
                            <td>{carpet.descriptions}</td>
                            <td>{carpet.availableStock}</td>
                            <td>{carpet.status}</td>
                            <td>{new Date(carpet.addedDate).toLocaleString()}</td> {/* Format the date */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarpetList;