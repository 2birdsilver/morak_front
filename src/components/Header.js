import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/kccic.png';
import mypage from '../images/person.png';
import { useAuth } from '../components/AuthContext';

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { getUserInfo } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const updateProfile = async () => {
      // if (currentUser) {
      //   setIsLogin(true);
      //   setName(localStorage.getItem("name"));
      //   setUrl(localStorage.getItem("url"));
      // } else {
      //   setIsLogin(false);
      //   setName('');
      //   setUrl('');
      // }

      // access token이용해서 서버에서 받아온 이용자 정보(로그인 안된 경우 null값 반환)
      const user = await getUserInfo();

      if (user) {
        setCurrentUser(user);
        setIsLogin(true);

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
  }, [getUserInfo]);

  const goToHome = () => {
    navigate('/');
  };

  const goLogin = () => {
    navigate('/login');
  };

  const goMypage = () => {
    navigate('/mypage');
  };

  return (
    <div className='header'>
      <img src={logo} className='logo' alt="logo" />
      {
        currentUser ?
          <>
            <div className='mypage-icons' onClick={goMypage}>
              {
                currentUser ?
                  <img src={currentUser.avatarUrl} className='avatar' alt="inter-avatar" />
                  : <img src={mypage} className='mypage-icon' alt="mypage-icon" />
              }
              <div>{currentUser.name}</div>
            </div>
          </>
          : <div className='h-login' onClick={goLogin}>로그인</div>
      }

      <div className='title' onClick={goToHome}>
        Happy Desk
      </div>
      <div className='text'>포스트잇으로 메모를 남겨보세요!</div>
    </div>
  );
}

export default Header;
