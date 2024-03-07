import React, {useState} from 'react'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log('로그인 정보:', email, password);
    // 로그인 로직
  };
  return (
    <div className='wrap memo'>
        <div className='login-form-container'>
        <h1>Login</h1>
            <form className="login-form" onSubmit={handleLoginSubmit}>
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
                        <hr/>
                    </div>
                    <button type="submit" className='sign-btn google-login'>
                        <i className='icon-google'></i>
                        구글 계정으로 로그인
                    </button>
                </div>
               
            </form>
        </div>
    </div>
  )
}

export default Login