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
        <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-white p-8 rounded-2xl shadow-xl border border-emerald-100">
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6`}>
                <div className="flex flex-col">
                    <label className="block text-sm font-bold text-emerald-800 mb-2">Material</label>
                    <select
                        value={material}
                        onChange={e => setMaterial(e.target.value)}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 shadow"
                    >
                        <option value="">All</option>
                        {materials.map((mat, index) => <option key={index} value={mat}>{mat}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-bold text-emerald-800 mb-2">Color</label>
                    <select
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 shadow"
                    >
                        <option value="">All</option>
                        {colors.map((col, index) => <option key={index} value={col}>{col}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-bold text-emerald-800 mb-2">Dimensions</label>
                    <select
                        value={dimensions}
                        onChange={e => setDimensions(e.target.value)}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 shadow"
                    >
                        <option value="">All</option>
                        {dimensionOptions.map((dim, index) => <option key={index} value={dim}>{dim}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-bold text-emerald-800 mb-2">Status</label>
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 shadow"
                    >
                        <option value="">All</option>
                        {statuses.map((stat, index) => <option key={index} value={stat}>{stat}</option>)}
                    </select>
                </div>

                {/* Selected Filters */}
                <div className="col-span-1 sm:col-span-2 md:col-span-4 flex flex-wrap gap-3 mt-4">
                    {material && (
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full flex items-center shadow font-semibold">
                            {material}
                            <button
                                onClick={() => clearFilter('material')}
                                className="ml-2 text-gray-500 hover:text-emerald-700 cursor-pointer font-bold"
                                aria-label="Remove material filter"
                            >✖</button>
                        </span>
                    )}
                    {color && (
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full flex items-center shadow font-semibold">
                            {color}
                            <button
                                onClick={() => clearFilter('color')}
                                className="ml-2 text-gray-500 hover:text-emerald-700 cursor-pointer font-bold"
                                aria-label="Remove color filter"
                            >✖</button>
                        </span>
                    )}
                    {dimensions && (
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full flex items-center shadow font-semibold">
                            {dimensions}
                            <button
                                onClick={() => clearFilter('dimensions')}
                                className="ml-2 text-gray-500 hover:text-emerald-700 cursor-pointer font-bold"
                                aria-label="Remove dimensions filter"
                            >✖</button>
                        </span>
                    )}
                    {status && (
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full flex items-center shadow font-semibold">
                            {status}
                            <button
                                onClick={() => clearFilter('status')}
                                className="ml-2 text-gray-500 hover:text-emerald-700 cursor-pointer font-bold"
                                aria-label="Remove status filter"
                            >✖</button>
                        </span>
                    )}
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