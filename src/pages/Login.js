import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import naverloginbtn from '../images/naverloginbtn2.png';
import kakaotalkloginbtn from '../images/kakaotalk.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
      alert("로그인 성공");
      localStorage.clear();
      localStorage.setItem("id", res.data.id)
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("url", res.data.avatarUrl);
      // 사용자 정의 이벤트 발생
      window.dispatchEvent(new Event("loginSuccess"));
      navigate('/');
    } catch (error) {
      alert('로그인 실패'); // 에러 처리
    }
  };

  return (
    <div className='wrap memo'>
      <div className='login-form-container'>
        <h1>Login</h1>
        {/* <form className="login-form" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder='이메일을 입력하세요'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder='비밀번호를 입력하세요'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='login-btns'>
            <button type="submit" className='login-btn'>로그인</button>
            <button type="submit" className='sign-btn'>회원가입</button>
            <div className='hr-line'>
              <hr />
              <span>OR</span>
              <hr />
            </div>

          </div>

        </form> */}
        <button className='oauth-login-btn naver-login' onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/naver'}>
          <img className='oauth-login-img' src={naverloginbtn} alt="naverloginbtn" />
          <p>네이버로 시작하기</p>
        </button>

        <button className='oauth-login-btn kakao-login' onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/kakao'}>
          <img className='oauth-login-img' src={kakaotalkloginbtn} alt="kakaotalkloginbtn" />
          <p>카카오톡으로 시작하기</p>
        </button>
      </div>
    </div>
  )
}

export default Login