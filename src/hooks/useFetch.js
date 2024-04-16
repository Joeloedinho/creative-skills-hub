import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(url, { signal });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Abort fetch if component unmounts before fetch completes
      controller.abort();
    };
  }, [url]);

  return { data, isFetching, error };
};

export default useFetch;
