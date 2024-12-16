import { useState, useEffect } from 'react';

function useAsyncData(table, filters) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    const reload = async () => {
        try {
            setLoading(true);
            const result = await window.ipc.getData(table, filters);

            setData(result.success ? result?.data : null);
            setError(result.success ? null : result?.error);
        } catch (err) {

            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        "EFFECT"
        reload()

    }, [table, filters]);

    return { loading, data, error, reload };
}

export default useAsyncData;
