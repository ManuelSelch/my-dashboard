import apiService from '../services/apiService';
import useLocalStorage from './useLocalStorage';

const useLogin = () => {
    const [token, setToken] = useLocalStorage("token");

    const login = async (username, password) => {

        const result = await apiService.post(
            "auth",
            {
                username: username,
                password: password,
                type: "normal"
            }
        );
        
        
        setToken(result.auth_token);
    };


    return {token, setToken, login};
};

export default useLogin;
