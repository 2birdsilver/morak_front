import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// css
import "./App.css";
import "../src/css/Desk.css";
import "../src/css/Footer.css";
import "../src/css/Header.css";
import "../src/css/Home.css";
import "../src/css/MemoList.css";
import "../src/css/PasswordModal.css";
import "../src/css/Memo.css";
import "../src/css/Print.css";
import "../src/css/Login.css";
import "../src/css/Mypage.css";
import "../src/css/Comment.css";
import "../src/css/Search.css";
import "../src/css/Button.css";

// page
import Home from "./pages/Home";
import Memo from "./components/guestbook/MemoList";
import Print from "./pages/Print";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./components/user/AuthContext";
import Logout from "./components/user/Logout";
import MemoForm from "./pages/MemoForm";
import MemoDetail from "./pages/MemoDetail";
import SignupForm from "./pages/SignupForm";
import GuestbookDetailPage from "./pages/GuestbookDetailPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/guestbook/:id" element={<GuestbookDetailPage />} />
            {/* <Route
          path='/intern' 
          element={<Detail />}
        /> */}
            <Route path="/memo/:id" element={<MemoDetail />} />
            <Route path="/print" element={<Print />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/memo/create" element={<MemoForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
