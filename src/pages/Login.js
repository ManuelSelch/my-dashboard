import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
    const [username, setUsername] = useLocalStorage("username");
    const [password, setPassword] = useLocalStorage("password");
    const navigate = useNavigate();
    const { login } = useLogin();


    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (username !== '' && password !== '') {
            await login(username, password);
            navigate('/projects');
        } else {
          alert('Please enter username and password');
        }
    };

    return (
        <form className='p-10' onSubmit={handleLogin}>
            <p className='text-5xl font-bold'>Login</p>

            
            <label className="input input-bordered flex items-center gap-2 mt-10">
                Username
                <input type="text" className="grow" placeholder="user@example.com" value={username ?? ""} onChange={(e) => setUsername(e.target.value)} />
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-5">
                Password
                <input type="password" className="grow" value={password ?? ""} onChange={(e) => setPassword(e.target.value)}  />
            </label>

            <div className='flex justify-center'>
                <button className="btn mt-5">Login</button>
            </div>

        
        </form>
    );
};

export default Login;
