import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { getMemoById } from "../api/memoApi";

function MemoDetail() {
  const { id } = useParams(); // URL에서 id 값을 가져오기
  const navigate = useNavigate();
  const location = useLocation();
  const goback = () => {
    navigate(-1);
  };

  const { getUserInfo } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [shape, setShape] = useState("square");
  const [color, setColor] = useState("beige");
  const [recipient, setRecipient] = useState(false);

  const [memoId, setMemoId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(null);
  const [error, setError] = useState(null);

  const maxWriterLength = 20;
  const maxLength = 255;

  useEffect(() => {
    getMemoById({ id }).then((data) => setMemo(data));
  }, []);

  const updateProfile = async () => {
    const user = await getUserInfo();

    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  const handlePostitSubmit = async (e) => {
    e.preventDefault();

    const headData = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    };

    if (isEditing) {
    } else {
    }
  };

  return (
    <div className="memoDetail-page">
      {memo && (
        <div className="memoDetail">
          <div className="MemoDetail-content">
            <div className="memo_info">
              <div className="writer-style">from. {memo.writer}</div>
              <div className="date-style">{memo.createdDt}</div>
            </div>
            <div className="content-style">{memo.content}</div>
            <div className="MemoDetail-buttons">
              <button>수정</button>
              <button>삭제</button>
              <button>닫기</button>
            </div>
          </div>

          <div className="comments-section">
            <div className="comment-form">
              <input
                type="text"
                placeholder="작성자"
                className="comment-writer-input"
              />
              <textarea
                placeholder="댓글을 입력하세요"
                className="comment-content-input"
              ></textarea>
              <button className="comment-submit">댓글 등록</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoDetail;
