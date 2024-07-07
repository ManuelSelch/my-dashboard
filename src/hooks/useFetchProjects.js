import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const useFetchProjects = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.get("projects");
            setData(result);
        };

        fetchData();

    }, []);

    return data;
};

export default useFetchProjects;
