import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/kccic.png';
import mypage from '../images/person.png';

function Header() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    
    const updateProfile = () => {
      if (localStorage.getItem("id")) {
        setIsLogin(true);  
        setName(localStorage.getItem("name"));    
        setUrl(localStorage.getItem("url"));
      } else {
        setIsLogin(false);
        setName('');
        setUrl('');
      }
    };
  
    updateProfile(); // 컴포넌트 마운트 시 호출
    window.addEventListener("loginSuccess", updateProfile); // 사용자 정의 이벤트 리스너 추가
    return () => {
      window.removeEventListener("loginSuccess", updateProfile); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

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
          <>
            <div className='mypage-icons' onClick={goMypage}>
              {
                url? 
                <img src={url} className='avatar' alt="inter-avatar"/> 
              : <img src={mypage} className='mypage-icon' alt="mypage-icon"/>
              }
              <div>{name}</div>
            </div> 
          </>
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