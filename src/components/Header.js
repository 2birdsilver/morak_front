import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/kccic.png';
import mypage from '../images/person.png';

function Header() {

  const navigate = useNavigate();
  const {state} = useLocation();
  const isLogin = state;

  useEffect(()=> {
    console.log(isLogin);
  },[])

  const goToHome = () => {
    navigate('/');
  };

  const goLogin = () => {
    navigate('/login');
  }

  const goMypage = () => {
    navigate('/mypage');
  }

  return (
    <div className='header'>
        <img src={logo} className='logo' alt="logo"/>
        {
          isLogin? 
          <div className='mypage-icons' onClick={goMypage}>
            <img src={mypage} className='mypage-icon' alt="mypage-icon"/>
            <div>홍길동</div>
          </div> 
          : <div className='h-login' onClick={goLogin}>로그인</div>
        }
       
        <div className='title' onClick={goToHome}>
          Happy Desk
        </div>
        <div className='text'>포스트잇으로 메모를 남겨보세요!</div>
    </div>
  )
}

export default Header