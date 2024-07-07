import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const useFetchProject = (slug) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const encodedValue = encodeURIComponent(slug);
            const result = await apiService.get("projects/by_slug?slug="+encodedValue);
            console.log(result);
            setData(result);
        };

        fetchData();

    }, [slug]);

    return data;
};

export default useFetchProject;
