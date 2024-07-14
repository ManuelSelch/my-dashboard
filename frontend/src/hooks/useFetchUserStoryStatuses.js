import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import apiService from '../services/apiService';

const useFetchUserStoryStatuses = (project) => {
    const [data, setData] = useState([]);
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.get("userstory-statuses?project="+project, token);
            setData(result);
        };

        fetchData();

    }, [token, project]);

    return data;
};

export default useFetchUserStoryStatuses;
