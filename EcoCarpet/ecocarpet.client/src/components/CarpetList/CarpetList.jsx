import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function CarpetList() {
    const [carpets, setCarpets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔹 States for filter values
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [status, setStatus] = useState('');

    // 🔹 States for dropdown options
    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [statuses, setStatuses] = useState([]);

    // 🔹 State for mobile filter menu
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    // environment variable
    const apiUrl = import.meta.env.VITE_API_URL;
    
    useEffect(() => {
        
        const fetchCarpets = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = `${apiUrl}/Carpet/filter`;
                const queryParams = new URLSearchParams();
                if (material) queryParams.append('material', material);
                if (color) queryParams.append('color', color);
                if (dimensions) queryParams.append('dimensions', dimensions);
                if (status) queryParams.append('status', status);

                if (queryParams.toString()) {
                    url += '?' + queryParams.toString();
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCarpets(data);
            } catch (err) {
                setError(err);
                console.error('Error fetching carpets:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCarpets();
    }, [material, color, dimensions, status, apiUrl]);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await fetch(`${apiUrl}/Carpet`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setMaterials([...new Set(data.map(item => item.material))]);
                setColors([...new Set(data.map(item => item.color))]);
                setDimensionOptions([...new Set(data.map(item => item.dimensions))]);
                setStatuses([...new Set(data.map(item => item.status))]);
            } catch (err) {
                console.error('Error fetching filter options:', err);
            }
        };

        fetchFilterOptions();
    }, [apiUrl]);

    // 🔹 Remove a filter value
    const clearFilter = (filterType) => {
        if (filterType === 'material') setMaterial('');
        if (filterType === 'color') setColor('');
        if (filterType === 'dimensions') setDimensions('');
        if (filterType === 'status') setStatus('');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Carpet List</h1>

            {/* 🔹 Mobile Toggle Button for Filters */}
            <div className="md:hidden flex justify-center mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* 🔍 Filter Section */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Material:</label>
                    <select value={material} onChange={e => setMaterial(e.target.value)} className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-sm">
                        <option value="">All</option>
                        {materials.map((mat, index) => <option key={index} value={mat}>{mat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Color:</label>
                    <select value={color} onChange={e => setColor(e.target.value)} className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-sm">
                        <option value="">All</option>
                        {colors.map((col, index) => <option key={index} value={col}>{col}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dimensions:</label>
                    <select value={dimensions} onChange={e => setDimensions(e.target.value)} className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-sm">
                        <option value="">All</option>
                        {dimensionOptions.map((dim, index) => <option key={index} value={dim}>{dim}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status:</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-sm">
                        <option value="">All</option>
                        {statuses.map((stat, index) => <option key={index} value={stat}>{stat}</option>)}
                    </select>
                </div>
            </div>

            {/* Selected Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {material && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full flex items-center">{material} <button onClick={() => clearFilter('material')} className="ml-2 text-gray-500 hover:text-gray-700">✖</button></span>}
                {color && <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full flex items-center">{color} <button onClick={() => clearFilter('color')} className="ml-2 text-gray-500 hover:text-gray-700">✖</button></span>}
                {dimensions && <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full flex items-center">{dimensions} <button onClick={() => clearFilter('dimensions')} className="ml-2 text-gray-500 hover:text-gray-700">✖</button></span>}
                {status && <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full flex items-center">{status} <button onClick={() => clearFilter('status')} className="ml-2 text-gray-500 hover:text-gray-700">✖</button></span>}
            </div>

            {/* 📦 Carpet Grid */}
            {!loading && !error && carpets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {carpets.map(carpet => (
                        <div key={carpet.carpetID} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={carpet.imageUrl || "https://www.flooringsuperstore.com/media/catalog/product/cache/293b85e20f7172310ee4e8f824e7e68c/a/l/allure_-_rioja_cameo.jpg"}
                                alt={carpet.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{carpet.name}</h3>
                                <p className="text-gray-600">{carpet.descriptions}</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => navigate(`/products/${carpet.carpetID}`)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarpetList;
