import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import taigaService from '../services/taigaService';

const useFetchUserStories = (project) => {
    const [data, setData] = useState([]);
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            const result = await taigaService.get("userstories?project="+project, token);
            setData(result);
        };

        fetchData();

    }, [token, project]);

    return data;
};

export default useFetchUserStories;
