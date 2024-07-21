import React from "react";
import {useSelector, useDispatch} from "react-redux";

// feature
import {updateUsername, updatePassword, checkLogin} from "./LoginFeature";

// common
import Heading from "../../widgets/Heading";
import Input from "../../widgets/Common/Input";
import Button from "../../widgets/Common/Button";

const Login = () => {
    const login = useSelector((state) => state.login);

    if(login.isAdmin) {
        return(<Admin />)
    }
    else {
        return(<LoginForm />)
    }
};

const LoginForm = () => {
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    return(
        <div className='p-10'>
            <Heading>Login</Heading>

            <Input name="Username" type="email" value={login.username} setValue={(u) => dispatch(updateUsername(u))}/>
            <Input name="Password" type="password"  value={login.password} setValue={(p) => dispatch(updatePassword(p))}/>
            

            <div className='flex justify-center'>
               <Button name="Login" onClick={() => dispatch(checkLogin())}/>
            </div>
        </div>
    );
};

const Admin = () => {
    // const login = useSelector((state) => state.login);
    // const dispatch = useDispatch();

    return(
        <div>Admin</div>
    );
};

export default Login;