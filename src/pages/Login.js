import React from 'react'
import naverloginbtn from '../images/naverloginbtn2.png';
// import kakaotalkloginbtn from '../images/kakaotalk.png';

function Login() {

  return (
    <div className='wrap memo'>
      <div className='login-form-container'>
        <h1>Login</h1>
        <button className='oauth-login-btn naver-login' onClick={() => window.location.href = '/oauth2/authorization/naver'}>
          <img className='oauth-login-img' src={naverloginbtn} alt="naverloginbtn" />
          <p>네이버로 시작하기</p>
        </button>

        {/* <button className='oauth-login-btn kakao-login' onClick={() => window.location.href = '/oauth2/authorization/kakao'}>
          <img className='oauth-login-img' src={kakaotalkloginbtn} alt="kakaotalkloginbtn" />
          <p>카카오톡으로 시작하기</p>
        </button> */}
      </div>
    </div>
  )
}

export default Login