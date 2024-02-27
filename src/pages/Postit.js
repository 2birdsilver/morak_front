import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";

function Postit() {

        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        const goback = () => {
            navigate(-1);
        };

        const [writer, setWriter] = useState('');
        const [password, setPassword] = useState('');
        const [content, setContent] = useState('');
        const [isEditing, setIsEditing] = useState(false);
        const [recipient, setRecipient] = useState(false);
        const [memoId, setMemoId] = useState(false);


     useEffect(() => {
             const searchParams = new URLSearchParams(location.search);
             const editMode = searchParams.get('edit') === 'true';

             if (editMode) {
                 setIsEditing(true);
                 axios.get(`/memo/update/${params.id}`)
                     .then((res) => {
                         const { writer, content } = res.data;
                         setWriter(writer);
                         setContent(content);
                         setMemoId(params.id);
                         // 비밀번호 관련 처리는 상황에 따라 다름
                     })
                     .catch((err) => console.error("Error fetching memo data:", err));
             } else {
                setRecipient(params.id)
             }
     }, [params.id, location.search]);

     const handlePostitSubmit = async (e) => {
            e.preventDefault();

            const memoData = {
                writer,
                recipient,
                content,
                password,
                shape: "square",
                color: "white"
            };

            if (isEditing) {
                // 수정 로직
                axios
                    .put(`/memo/${memoId}`, memoData)
                    .then((res) => {
                        alert("포스트잇 수정 완료");
                        navigate(-1); // 또는 수정 후 보여줄 페이지로 이동
                    })
                    .catch((err) => {
                        alert("포스트잇 수정 실패");
                        console.log(err);
                    });
            } else {
                // 등록 로직
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
     };


  return (
          <div className='wrap memo'>
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
                          {isEditing ? (
                              <button type="submit" className="p-btn">수정</button>
                          ) : (
                              <button type="submit" className="p-btn add-btn">등록</button>
                          )}
                      </div>
                  </form>
              </div>
          </div>
  );
}

export default Postit;