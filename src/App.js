import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={<Home />}
        />
        <Route
          path='/intern' 
          element={<Detail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
