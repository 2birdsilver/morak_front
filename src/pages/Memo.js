import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Memo() {
  const { id } = useParams();
  const navigate = useNavigate(); // 네비게이트 훅 추가
  const [memos, setMemos] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    // 사용자 정보를 불러오는 API 호출
    fetch(`/members/${id}`)
      .then(response => response.json())
      .then(data => setName(data.name))
      .catch(error => console.error("사용자 정보를 불러오는 중 에러 발생:", error));

    // 메모 데이터를 불러오는 API 호출
    fetch(`/memo/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('메모를 불러오는 데 실패했습니다.');
        }
        return response.json();
      })
      .then(data => setMemos(data))
      .catch(error => console.error("메모 데이터를 불러오는 중 에러 발생:", error));
  }, [id]);

  // 메모 작성 페이지로 이동하는 함수
  const goToCreateMemo = () => {
    navigate(`/create-memo/${id}`);
  };

  // 홈 페이지로 이동하는 함수
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>{name}에게 포스트잇을 붙여봐!</h2>
      {memos.length > 0 ? (
        <ul>
          {memos.map(memo => (
            <li key={memo.id}>{memo.content} - {memo.sender}</li>
          ))}
        </ul>
      ) : (
        <p>{name}님께 첫 번째 메모를 남겨보세요!!</p>
      )}
      <button onClick={goToCreateMemo}>메모 작성</button>
      <button onClick={goToHome}>Home</button>
    </div>
  );
}

export default Memo;
