import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Filter = ({ apiUrl, onFilterChange }) => {
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [status, setStatus] = useState('');

    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [showFilters, setShowFilters] = useState(false);

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

    const clearFilter = (filterType) => {
        if (filterType === 'material') setMaterial('');
        if (filterType === 'color') setColor('');
        if (filterType === 'dimensions') setDimensions('');
        if (filterType === 'status') setStatus('');
    };

    useEffect(() => {
        onFilterChange({ material, color, dimensions, status });
    }, [material, color, dimensions, status, onFilterChange]);

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
            {/* Toggle Button for Filters (Visible only on small screens) */}
            <div className="flex justify-center mb-6 md:hidden">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Filter Section (Always visible on medium and larger screens) */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ${showFilters ? '' : 'hidden md:grid'}`}>
                <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Material:</label>
                    <select value={material} onChange={e => setMaterial(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm">
                        <option value="">All</option>
                        {materials.map((mat, index) => <option key={index} value={mat}>{mat}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color:</label>
                    <select value={color} onChange={e => setColor(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm">
                        <option value="">All</option>
                        {colors.map((col, index) => <option key={index} value={col}>{col}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions:</label>
                    <select value={dimensions} onChange={e => setDimensions(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm">
                        <option value="">All</option>
                        {dimensionOptions.map((dim, index) => <option key={index} value={dim}>{dim}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status:</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm">
                        <option value="">All</option>
                        {statuses.map((stat, index) => <option key={index} value={stat}>{stat}</option>)}
                    </select>
                </div>

                {/* Selected Filters */}
                <div className="col-span-1 sm:col-span-2 md:col-span-4 flex flex-wrap gap-3 mt-4">
                    {material && <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full flex items-center shadow-md">{material} <button onClick={() => clearFilter('material')} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">✖</button></span>}
                    {color && <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full flex items-center shadow-md">{color} <button onClick={() => clearFilter('color')} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">✖</button></span>}
                    {dimensions && <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full flex items-center shadow-md">{dimensions} <button onClick={() => clearFilter('dimensions')} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">✖</button></span>}
                    {status && <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full flex items-center shadow-md">{status} <button onClick={() => clearFilter('status')} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">✖</button></span>}
                </div>
            </div>
        </div>
    );
};

Filter.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default Filter;