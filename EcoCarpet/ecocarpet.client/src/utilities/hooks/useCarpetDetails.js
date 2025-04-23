import { useEffect, useState } from "react";

const useCarpetDetails = (id) => {
    const [carpet, setCarpet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!id) {
            setError("Invalid ID provided");
            setLoading(false);
            return;
        }

        if (!apiUrl) {
            console.error("API URL is not defined in environment variables");
            setError("API URL is not configured");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const fetchCarpetDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/Carpet/${id}`, { signal: controller.signal });
                if (!response.ok) throw new Error("Carpet not found");
                const data = await response.json();
                setCarpet(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCarpetDetails();

        return () => controller.abort(); // Cleanup on unmount
    }, [apiUrl, id]);

    return { carpet, loading, error };
};

export default useCarpetDetails;
