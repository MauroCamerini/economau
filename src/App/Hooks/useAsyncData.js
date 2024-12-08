    import { useState, useEffect } from 'react';

    function useAsyncData(table, filters) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const invokeGetData = async () => {
            try {
                setLoading(true);
                const result = await window.ipc.getData(table, filters);
                console.log("async data", result)
                if (isMounted) {
                setData(result.success ? result?.data : null);
                setError(result.success ? null : result?.error);
                }
            } catch (err) {

                if (isMounted) {
                setError(err.message || 'Error desconocido');
                }
            } finally {
                if (isMounted) {
                setLoading(false);
                }
            }
        };

        invokeGetData();

        return () => {
        isMounted = false;
        };
    }, [table, filters]);

    return { loading, data, error };
    }

    export default useAsyncData;
