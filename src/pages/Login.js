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
    <div className='post-form-container'>
    <h1>Login</h1>
        <form className="post-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
                <label htmlFor="writer">이메일</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder='kCC정보통신 이메일을 입력하세요'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='비밀번호를 입력하세요'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="p-btn add-btn">로그인</button>
             
        </form>
    </div>
</div>
  )
}

export default Login