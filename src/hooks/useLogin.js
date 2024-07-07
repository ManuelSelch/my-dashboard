import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import useLocalStorage from './useLocalStorage';

const useLogin = () => {
    const [token, setToken] = useLocalStorage("taigaToken");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService.post(
                "auth",
                {
                    username: process.env.REACT_APP_TAIGA_USER,
                    password: process.env.REACT_APP_TAIGA_PASS,
                    type:"normal"
                }
            );

            setToken(result.auth_token);
            setData(result.auth_token);
        };

        fetchData();

    }, []);

    return data;
};

export default useLogin;
