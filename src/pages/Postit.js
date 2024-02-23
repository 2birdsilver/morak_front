import React, { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from "axios";

function Postit() {

    const params = useParams();
    const navigate = useNavigate();
    const goback = () => {
        navigate(-1);
      };

    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');


    const handlePostitSubmit = async (e) => {
        e.preventDefault();

        const memoData = {
            writer: writer,
            recipient: params.id,
            content:content,
            password:password,
            shape: "square",
            color: "white"
        }

        axios
            .post("/memo", memoData)
            .then((res) => {
                alert("포스트잇 등록 완료");
                navigate(-1);
            })
            .catch((err) => {
                alert("포스트잇 등록 실패");
                console.log(err);
            })
    }


  return (
    <div className='wrap'>
        <button className='back-btn' onClick={goback}>◀ 뒤로가기</button>
        <div className="post-form-container">
        <form className="post-form" onSubmit={handlePostitSubmit}>
            <div className="form-group">
                <label htmlFor="writer">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="writer"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
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
                <button className="p-btn">삭제</button>
                <button className="p-btn">수정</button>
                <button type="submit" className="p-btn add-btn">등록</button>
            </div>
        </form>
        </div>

    </div>
  )
}

export default Postit;