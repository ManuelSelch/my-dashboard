import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useLocalStorage from '../hooks/useLocalStorage';
import Input from '../widgets/Common/Input';

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

            <Input name="Username" value={username} setValue={setUsername}/>
            <Input name="Password" type="password" value={password} setValue={setPassword}/>
            

            <div className='flex justify-center'>
                <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                    <span>Login</span>
                </button>
            </div>

        
        </form>
    );
};

export default Login;
