import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const useFetchMilestones = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.get("milestones");

            setData(result);
        };

        fetchData();

    }, []);

    return data;
};

export default useFetchMilestones;
