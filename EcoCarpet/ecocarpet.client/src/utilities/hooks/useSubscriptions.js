import { useEffect, useState } from "react";
import axios from "axios";

const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`${apiUrl}/subscriptions`)
            .then(response => {
                setSubscriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message || "Failed to fetch subscriptions");
                setLoading(false);
            });
    }, [apiUrl]);

    return { subscriptions, loading, error };
};

export default useSubscriptions;
