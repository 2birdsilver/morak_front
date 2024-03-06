import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import '../src/css/Desk.css';
import '../src/css/Footer.css';
import '../src/css/Header.css';
import '../src/css/Home.css';
import '../src/css/Memo.css';
import '../src/css/PasswordModal.css'; 
import '../src/css/MemoDetail.css';
import '../src/css/Postit.css';
import '../src/css/Print.css';
import Home from './pages/Home';
import Memo from './pages/Memo';
import Postit from './pages/Postit';
import Print from './pages/Print';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <HashRouter>
      <Header />
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
         <Route path="/print" element={<Print />}/>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
