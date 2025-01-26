import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import taigaService from '../services/taigaService';

const useFetchProject = (slug) => {
    const [data, setData] = useState({});
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            if(slug === null) {
                return;
            }
            
            const encodedValue = encodeURIComponent(slug);
            const result = await taigaService.get("projects/by_slug?slug="+encodedValue, token);
            setData(result);
        };

        fetchData();

    }, [slug, token]);

    return data;
};

export default useFetchProject;
