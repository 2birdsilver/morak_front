import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'

function Postit() {

    const navigate = useNavigate();
    const goback = () => {
        navigate(-1);
      };

    const [title, setTitle] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        // 폼 제출 로직 처리, 예: API 호출 등
        console.log({ title, nickname, password, content });
    };


  return (
    <div className='wrap'>
        <button className='back-btn' onClick={goback}>◀ 뒤로가기</button>
        <div className="post-form-container">
        <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    name="content"
                    rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <div className="form-buttons">
                <button type="submit" className="p-btn">삭제</button>
                <button type="submit" className="p-btn">수정</button>
                <button type="submit" className="p-btn add-btn">등록</button>
            </div>
        </form>
        </div>

    </div>
  )
}

export default Postit;