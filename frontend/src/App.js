import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// common
import Header from './widgets/Home/Header';
import ActionButtons from "./widgets/Common/ActionButtons";

// features
import Home from './features/home/Home';
import ProjectDetails from './features/project/ProjectDetails';
import ProjectPopup from "./features/project/ProjectPopup";
import Login from './features/login/Login';
import Footer from './widgets/Home/Footer';

// actions
import { initApp, toggleEditMode } from "./features/home/HomeFeature";

const App = () => {
    const isShowing = useSelector((state) => state.project.isShowing)
    const isAdmin = useSelector((state) => state.login.isAdmin)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initApp());
    })
    
    return(
        <div className='h-screen flex flex-col'>
            <BrowserRouter>
                <Header />

                <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/project/:slug" element={<ProjectDetails/>} />
                <Route exact path="/login" element={<Login/>} />
                </Routes>

                {isShowing &&
                    <ProjectPopup />
                }
                
                {isAdmin &&
                    <ActionButtons icon="fa-hammer" onClick={() => dispatch(toggleEditMode())} />
                }
                
                <Footer />
            </BrowserRouter> 
        </div>
    );
}

export default App;