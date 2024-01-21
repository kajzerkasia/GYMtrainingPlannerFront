import React, { useEffect, useState } from "react";

interface FetchResult<T> {
    isFetching: boolean;
    fetchedData: T | null;
    setFetchedData: React.Dispatch<React.SetStateAction<T | null>>;
    error: { message: string } | null;
}

export function useFetch<T>(fetchFn: () => Promise<T>, initialValue: T | null): FetchResult<T> {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [fetchedData, setFetchedData] = useState<T | null>(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({
                    message: (error as Error).message || 'Failed to fetch data.'
                });
            } finally {
                setIsFetching(false);
            }
        }

        fetchData();
    }, [fetchFn]);

    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error,
    };
}