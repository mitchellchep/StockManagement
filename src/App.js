import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Stocks';
import Stocks from './pages/Stocks';
import Layout from './components/Layout';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/stocks/:symbol" element={<Stocks />} />
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;