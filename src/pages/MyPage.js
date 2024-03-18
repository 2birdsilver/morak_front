import React, { useState, useEffect, useCallback } from 'react'
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


  const fetchUserInfo = useCallback(() => {
    axios.get(`/members/${userId}`)
        .then((res) =>{
            const {name, email, introduction} = res.data;
            setName(name);
            setEmail(email);
            setIntro(introduction);
        })
        .catch((err) => console.error("Error fetching memo data:", err));
  },[userId]);

  useEffect(()=>{
    fetchUserInfo();
  },[fetchUserInfo]);

  const handleLogout = () => {
    alert("로그아웃되었습니다.");
    localStorage.clear();
    navigate('/', {state : false});
  }


  const handleMyInfoSubmit = async (e) => {
    if (password === '') {
      alert("비밀번호를 입력하세요.");
      return;
    }
    e.preventDefault(); 

     // 내 정보 수정
     let data = new FormData();
     data.append('userId', userId);
     data.append("password", password);
     data.append('introduction', intro);
     if (keyboard) data.append("keyboard", keyboard);
     if (mouse) data.append("mouse", mouse);

     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `/auth/myinfo/update`,
      data: data,
     };

     axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("정보가 수정되었습니다.")
      })
      .catch((error) => {
        console.log(error);
        alert("정보 수정에 실패하였습니다.")
      });

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
                    placeholder='비밀번호를 입력하세요'
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
            <div className='fileText'>
              <div>⚠ 1MB 이하 이미지를 첨부해주세요.</div>
              <div>⚠ 키보드는 가로가 더 긴 이미지로</div>
              <div>⚠ 배경을 제거하는 것을 추천</div>
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