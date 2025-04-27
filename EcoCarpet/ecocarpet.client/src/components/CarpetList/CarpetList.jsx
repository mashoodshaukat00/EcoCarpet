import { useState, useEffect, useCallback } from 'react';
import Carpet from './Carpet';
import Filter from './Filter';

function CarpetList() {
    const [carpets, setCarpets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchCarpets = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            let url = `${apiUrl}/Carpet/filter`;
            const queryParams = new URLSearchParams();

            // Append filters only if they have values
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });

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
    }, [apiUrl]);

    useEffect(() => {
        fetchCarpets(); // Initial fetch with no filters
    }, [fetchCarpets]);

    // Show/hide filter state
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4 text-emerald-800">Carpet List</h1>
            
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full shadow font-semibold transition duration-300"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {showFilters && (
                <Filter apiUrl={apiUrl} onFilterChange={fetchCarpets} />
            )}

            {/* Carpet Grid */}
            {loading && <p className="text-center">Loading carpets...</p>}
            {error && <p className="text-center text-red-500">Error loading carpets: {error.message}</p>}
            {!loading && !error && carpets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {carpets.map(carpet => (
                        <Carpet key={carpet.carpetID} carpet={carpet} />
                    ))}
                </div>
            )}
            {!loading && !error && carpets.length === 0 && (
                <p className="text-center text-gray-500">No carpets found.</p>
            )}
        </div>
    );
}

export default CarpetList;
