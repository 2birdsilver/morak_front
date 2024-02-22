import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
// import Detail from './pages/Detail';
import Memo from './pages/Memo';
import Postit from './pages/Postit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={<Home />}
        />
        {/* <Route
          path='/intern' 
          element={<Detail />}
        /> */}
         <Route path="/memo/:id" element={<Memo />} />
         <Route path="/postit/:id" element={<Postit />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
