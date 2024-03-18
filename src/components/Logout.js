// Logout.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.get('/api/logout'); // 서버의 로그아웃 엔드포인트에 POST 요청
        navigate('/'); // 로그아웃 후 홈페이지로 이동
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>로그아웃 중...</div>;
}

export default Logout;
