import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/kccic.png';

function Header() {

  const navigate = useNavigate(); // 페이지 네비게이션을 위한 Hook

  // 홈 페이지로 이동하는 함수
  const goToHome = () => {
    navigate('/');
  };


  return (
    <div className='header'>
        <img src={logo} className='logo' alt="logo"/>
        <div className='title' onClick={goToHome}>
          Happy Desk
        </div>
        <div className='text'>포스트잇으로 메모를 남겨보세요!</div>
    </div>
  )
}

export default Header