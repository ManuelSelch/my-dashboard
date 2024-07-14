import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import apiService from '../services/apiService';

const useFetchMilestones = (project) => {
    const [data, setData] = useState([]);
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.get("milestones?project="+project, token);
            setData(result);
        };

        fetchData();

    }, [token, project]);

    return data;
};

export default useFetchMilestones;
