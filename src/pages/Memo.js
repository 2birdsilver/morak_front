import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import keyboard from '../images/keyword.png';
import mouse from '../images/mouse.png';

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
    navigate(`/postit/${id}`);
  };

  // 홈 페이지로 이동하는 함수
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className='wrap memo'>
      <h2>{name}에게 포스트잇을 붙여봐!</h2>
      <div className='btns'>
        <button className='btn' onClick={goToCreateMemo}>📝 Memo</button>
        <button className='btn' onClick={goToHome}>🏠 Home</button>  
      </div>

      {memos.length > 0 ? (
        <ul>
          {memos.map(memo => (
            <li key={memo.id}>{memo.content} - {memo.sender}</li>
          ))}
        </ul>
      ) : (
        <div>{name}님께 첫 번째 메모를 남겨보세요!</div>
      )}

    <div className='place'>
      <div className="notebook">
        </div>
        <div className='km'>
          <img className='keyboard' src={keyboard} />
          <img className='mouse' src={mouse} />
      </div>
    </div>
    


    </div>
  );
}

export default Memo;
