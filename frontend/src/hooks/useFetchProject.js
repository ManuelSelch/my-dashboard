import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import apiService from '../services/apiService';

const useFetchProject = (slug) => {
    const [data, setData] = useState({});
    const {token} = useLogin();

    useEffect(() => {
        const fetchData = async () => {
            const encodedValue = encodeURIComponent(slug);
            const result = await apiService.get("projects/by_slug?slug="+encodedValue, token);
            setData(result);
        };

        fetchData();

    }, [slug, token]);

    return data;
};

export default useFetchProject;
