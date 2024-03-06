import React, { useState, useEffect } from 'react'
import axios from 'axios';

function MyPage() {

  const [id, setId] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [nick, setNick] = useState('');
  const [intro, setIntro] = useState('');
  const [keyboard, setKeyboard] = useState('');
  const [mouse, setMouse] = useState('');

  // 사용자 정보 가져오기
  const fetchUserInfo = (() => {
    
  }, []);

  useEffect(() => {
    // fetchUserInfo();
  }, []);


  const handleMyInfoSubmit = async () => {
    console.log("내 정보 수정");

     // 리뷰 수정 데이터 보내기
     let data = new FormData();
     data.append('id', id);
     data.append('Introduction', intro);
     data.append('photoUrl',photo );

     let config = {
      method: 'put',
      method: 'put',
      maxBodyLength: Infinity,
      url: `/members/edit/${id}`,
      data: data
     };

     try {
        const res = await axios.request(config);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className='wrap memo'>
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
                <label htmlFor="photo">프로필 사진</label>
                <input
                type="file"
                    id="photo"
                    name="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="keyboard">내 키보드</label>
                <input
                type="file"
                    id="keyboard"
                    name="keyboard"
                    value={keyboard}
                    onChange={(e) => setKeyboard(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="intro">내 마우스</label>
                <input
                type="file"
                    id="mouse"
                    name="mouse"
                    value={mouse}
                    onChange={(e) => setMouse(e.target.value)}
                />
            </div>
            </form>
        </div>
    </div>
  )
}

export default MyPage