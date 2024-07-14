import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import apiService from '../services/apiService';

const useFetchUserStories = (project) => {
    const [data, setData] = useState([]);
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.get("userstories?project="+project, token);
            setData(result);
        };

        fetchData();

    }, [token, project]);

    return data;
};

export default useFetchUserStories;
