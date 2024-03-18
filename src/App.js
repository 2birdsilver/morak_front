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
import '../src/css/Login.css';
import '../src/css/Mypage.css';
import Home from './pages/Home';
import Memo from './pages/Memo';
import Postit from './pages/Postit';
import Print from './pages/Print';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import { AuthProvider } from './components/AuthContext'; 
import Logout from './components/Logout';


function App() {
  return (
    <HashRouter>
      <AuthProvider>
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
          <Route path="/print" element={<Print />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;