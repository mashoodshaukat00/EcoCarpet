import { useState, useEffect } from 'react';
import Carpet from './Carpet';
import Filter from './Filter';

function CarpetList() {
    const [carpets, setCarpets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter states
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [status, setStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [statuses, setStatuses] = useState([]);

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
                if (searchQuery) queryParams.append('search', searchQuery);

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
    }, [material, color, dimensions, status, searchQuery, apiUrl]);

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Carpet List</h1>

            {/* Filter Section */}
            <Filter
                material={material}
                setMaterial={setMaterial}
                color={color}
                setColor={setColor}
                dimensions={dimensions}
                setDimensions={setDimensions}
                status={status}
                setStatus={setStatus}
                materials={materials}
                colors={colors}
                dimensionOptions={dimensionOptions}
                statuses={statuses}
                clearFilter={clearFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Carpet Grid */}
            {!loading && !error && carpets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {carpets.map(carpet => (
                        <Carpet key={carpet.carpetID} carpet={carpet} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarpetList;
