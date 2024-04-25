import { useState, useEffect, useRef } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const abortController = useRef(new AbortController());

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 
                        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    signal: abortController.current.signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    setData(data);
                } else {
                    throw new Error("Oops, we haven't got JSON!");
                }
            } catch (error) {
                if (!abortController.current.signal.aborted) {
                    setError(`Failed to fetch: ${error.message}`);
                }
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();

        return () => {
            abortController.current.abort();
        };
    }, [url]); // Consider dependencies like headers if they may change over time

    return { data, isFetching, error };
};

export default useFetch;
