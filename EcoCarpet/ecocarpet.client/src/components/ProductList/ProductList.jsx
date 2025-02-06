import { useState, useEffect } from 'react';
import './ProductList.css'; 

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
        //    {/*<table>  Use a table for better structure */}
        //    {/*    <thead>*/}
        //    {/*        <tr>*/}
        //    {/*            <th>Name</th>*/}
        //    {/*            <th>Material</th>*/}
        //    {/*            <th>Dimensions</th>*/}
        //    {/*            <th>Color</th>*/}
        //    {/*            <th>Descriptions</th>*/}
        //    {/*            <th>Available Stock</th>*/}
        //    {/*            <th>Status</th>*/}
        //    {/*            <th>Added Date</th>*/}
        //    {/*        </tr>*/}
        //    {/*    </thead>*/}
        //    {/*    <tbody>*/}
        //    {/*        {carpets.map(carpet => (*/}
        //    {/*            <tr key={carpet.carpetID}>  Important: Add a unique key */}
        //    {/*                <td>{carpet.name}</td>*/}
        //    {/*                <td>{carpet.material}</td>*/}
        //    {/*                <td>{carpet.dimensions}</td>*/}
        //    {/*                <td>{carpet.color}</td>*/}
        //    {/*                <td>{carpet.descriptions}</td>*/}
        //    {/*                <td>{carpet.availableStock}</td>*/}
        //    {/*                <td>{carpet.status}</td>*/}
        //    {/*                <td>{new Date(carpet.addedDate).toLocaleString()}</td>  Format the date */}
        //    {/*            </tr>*/}
        //    {/*        ))}*/}
        //    {/*    </tbody>*/}
        //    {/*</table>*/}
        //</div>
        <div className="carpet-container">
            {carpets.map(carpet => (
                <div className="carpet-card" key={carpet.id}>
                    {/*<img src={carpet.imageUrl} alt={carpet.name} />*/}
                    <img src="https://media.istockphoto.com/id/1308274767/vector/rich-persian-colored-carpet-ethnic-pattern.jpg?s=612x612&w=is&k=20&c=QzQoOAoL8kuJ9uVBMcsJIIY02vY5DqWlYlTJNVGSLGM=" alt="Rich Persian Colored Carpet" />
                    <h3>{carpet.name}</h3>
                    <p>{carpet.descriptions}</p>
                       <div className="buttons">
                        <button>View Product</button>
                        </div>
                </div>
            ))}
        </div>  
    );
}

export default CarpetList;