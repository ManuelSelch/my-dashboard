import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actions } from '../features/UserFeature';
import Input from '../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../_refactor/hooks/useLocalStorage';

const Login = () => {
    const [token, _] = useLocalStorage("token");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);
    

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (username !== '' && password !== '') {
            dispatch(actions.checkLogin(username, password));
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

            <span>{user.error}</span>
        
        </form>
    );
};

export default Login;