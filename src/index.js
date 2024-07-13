import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

import './style/index.css';

import Home from './pages/Home';
import TaigaProjects from './pages/TaigaProjects';
import TaigaProjectDetails from './pages/TaigaProjectDetails';
import Login from './pages/Login';

import useLogin from './hooks/useLogin';

const Header = () => {
  const { token, setToken } = useLogin();

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="navbar bg-base-100">
      <Link className='btn btn-ghost text-xl' to="/">Home</Link>
      <Link className='btn btn-ghost text-xl' to="/projects">Projects</Link>

      {token
      ? <button className='btn btn-ghost text-xl ml-auto' onClick={handleLogout}>Logout</button> 
      : <Link className='btn btn-ghost text-xl ml-auto' to="/login">Login</Link>
      }
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/projects" element={<TaigaProjects/>} />
        <Route path="/project/:slug" element={<TaigaProjectDetails/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

