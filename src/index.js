import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";
import './style/index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaigaProjects from './pages/TaigaProjects';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div class="navbar bg-base-100">
        <Link className='btn btn-ghost text-xl' to="/">Home</Link>
        <Link className='btn btn-ghost text-xl' to="/taiga">Projects</Link>
      </div>
    
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/taiga" element={<TaigaProjects/>} />
      </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);