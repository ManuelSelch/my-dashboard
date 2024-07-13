import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import apiService from '../services/apiService';

const useFetchProjects = () => {
    const [data, setData] = useState([]);
    const {token} = useLogin(); 

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.get("projects", token);
            setData(result);
        };

        fetchData();
    }, [token]);  

    return data;
};

export default useFetchProjects;
