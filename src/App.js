import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import TaigaProjects from './TaigaProjects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/taiga" element={<TaigaProjects/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
