import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import taigaService from '../services/taigaService';

const useFetchUserStoryStatuses = (project) => {
    const [data, setData] = useState([]);
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            const result = await taigaService.get("userstory-statuses?project="+project, token);
            setData(result);
        };

        fetchData();

    }, [token, project]);

    return data;
};

export default useFetchUserStoryStatuses;
