import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPage() {

 const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [intro, setIntro] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [mobile, setMobile] = useState('');
  const [keyboard, setKeyboard] = useState(null);
  const [mouse, setMouse] = useState(null);


  const fetchUserInfo = () => {
    axios.get(`/members/${userId}`)
        .then((res) =>{
            const {name, email, introduction} = res.data;
            console.log(res.data);
            setName(name);
            setEmail(email);
            setIntro(introduction);
        })
        .catch((err) => console.error("Error fetching memo data:", err));
  }


  useEffect(()=>{
    fetchUserInfo();
  },[userId]);

  const handleLogout = () => {
    alert("로그아웃되었습니다.");
    localStorage.clear();
    navigate('/');
  }


  const handleMyInfoSubmit = async (e) => {
    e.preventDefault(); 
    console.log("내 정보 수정");
    console.log(keyboard);

     // 내 정보 수정
     let data = new FormData();
     data.append('userId', userId);
     data.append("password", password);
     data.append('introduction', intro);
     if (keyboard) data.append("keyboard", keyboard);

     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `/auth/myinfo/${userId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
     };

     try {
        const res = await axios.request(config);
        alert("정보가 수정되었습니다.")
        fetchUserInfo();
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div className='wrap memo'>
        <button className='logout-btn' onClick={handleLogout}>로그아웃</button>
    <div className='post-form-container'>
      <h1>마이페이지</h1>
        <form className="post-form" onSubmit={handleMyInfoSubmit}>
            <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=''
                    value={email}
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder=''
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="intro">프로필 글</label>
                <input
                type="text"
                    id="intro"
                    name="intro"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="keyboard">내 키보드</label>
                <input
                    type="file"
                    id="keyboard"
                    name="keyboard"
                    onChange={(e) => setKeyboard(e.target.files[0])}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mouse">내 마우스</label>
                <input
                    type="file"
                    id="mouse"
                    name="mouse"
                    onChange={(e) => setMouse(e.target.files[0])}
                />
            </div>
            <div className="form-buttons">
                <button type="submit" className="p-btn my-btn">수정</button>  
            </div>
            </form>
        </div>
    </div>
  )
}

export default MyPage