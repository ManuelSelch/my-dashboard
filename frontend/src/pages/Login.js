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

            <>
                {/*    <!-- Component: Rounded basic input  --> */}
                <div className="relative my-6">
                    <input
                    id="id-01"
                    type="text"
                    name="id-01"
                    placeholder="your name"
                    value={username ?? ""} 
                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label
                    htmlFor="id-01"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                    >
                    Username
                    </label>
                </div>
                {/*    <!-- End Rounded basic input  --> */}
            </>
            
            <>
                {/*    <!-- Component: Rounded basic input  --> */}
                <div className="relative my-6">
                    <input
                    id="id-02"
                    type="password"
                    name="id-02"
                    value={password ?? ""} 
                    placeholder="your password"
                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label
                    htmlFor="id-02"
                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                    >
                    Password
                    </label>
                </div>
                {/*    <!-- End Rounded basic input  --> */}
            </>

            <div className='flex justify-center'>
                <button class="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                    <span>Login</span>
                </button>
            </div>

        
        </form>
    );
};

export default Login;
