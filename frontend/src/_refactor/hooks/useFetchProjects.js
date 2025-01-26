import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import taigaService from '../services/taigaService';

const useFetchProjects = () => {
    const [data, setData] = useState([]);
    const {token} = useLogin(); 

    useEffect(() => {
        const fetchData = async () => {
            const result = await taigaService.get("projects", token);
            setData(result);
        };

        fetchData();
    }, [token]);  

    return data;
};

export default useFetchProjects;
