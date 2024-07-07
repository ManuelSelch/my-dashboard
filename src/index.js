import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";
import './style/index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaigaProjects from './pages/TaigaProjects';
import TaigaProjectDetails from './pages/TaigaProjectDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="navbar bg-base-100">
        <Link className='btn btn-ghost text-xl' to="/">Home</Link>
        <Link className='btn btn-ghost text-xl' to="/projects">Projects</Link>
      </div>
    
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/projects" element={<TaigaProjects/>} />
        <Route path="/project/:slug" element={<TaigaProjectDetails/>} />
      </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);