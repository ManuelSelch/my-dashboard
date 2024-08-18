import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// common
import Header from './common/Header';
import ActionButtons from "./common/ActionButtons";

// features
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Login';
import Footer from './common/Footer';

// actions
import { actions as userActions } from './features/UserFeature';
import { thunks as projectThunks } from './features/ProjectsFeature';

const App = () => {
    const isAdmin = useSelector((state) => state.user.isAdmin)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(projectThunks.fetchProjects());
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

                
                {isAdmin &&
                    <ActionButtons icon="fa-hammer" onClick={() => dispatch(userActions.toggleEditMode())} />
                }
                
                <Footer />
            </BrowserRouter> 
        </div>
    );
}

export default App;