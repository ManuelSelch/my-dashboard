import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// common
import Header from './common/Header';
import ActionButtons from "./common/ActionButtons";

// features
import Home from './pages/Home';
import Login from "./pages/Login";
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Footer from './common/Footer';

// actions
import { actions as userActions } from './features/UserFeature';
import { thunks as projectThunks } from './features/ProjectsFeature';

const App = () => {
    const [isInit, setInit] = useState(false);
    const isAdmin = useSelector((state) => state.user.isAdmin)

    const dispatch = useDispatch();
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    useEffect(() => {
        if(isInit)
            return;

        dispatch(projectThunks.fetchProjects());
        setInit(true);
    }, [isInit, dispatch])

    useEffect(() => {
        if (previousLocation) {
            document.body.classList.add("overflow-y-hidden")
        } else {
            document.body.classList.remove("overflow-y-hidden")
        }
    });
    
    return(
        <div className='h-screen flex flex-col'>
            <Header />

            <Routes location={previousLocation || location} >
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route path="/projects/:slug" element={<ProjectDetails/>} />
                <Route path="/projects/new" element={<NewProject/>} />
            </Routes>

            {previousLocation && (
            <Routes>
                <Route path="/projects/new" element={<NewProject />} />
            </Routes>
            )}

            
            {isAdmin &&
                <ActionButtons icon="fa-hammer" onClick={() => dispatch(userActions.toggleEditMode())} />
            }
            
            <Footer />
        </div>
    );
}

export default App;