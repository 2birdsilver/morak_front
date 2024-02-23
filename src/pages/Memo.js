import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import keyboard from '../images/keyword.png';
import mouse from '../images/mouse.png';
import Modal from '../components/MemoDetail';
import '../MemoDetail.css';
import axios from "axios";


function Memo() {
  const { id } = useParams(); // URL에서 id 값을 가져오기
  const navigate = useNavigate(); // 페이지 네비게이션을 위한 Hook
  const [memos, setMemos] = useState([]); // 메모 목록 상태 관리
  const [name, setName] = useState(''); // 사용자 이름 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [modalContent, setModalContent] = useState(''); // 모달에 표시될 내용 관리
  const [modalShape, setModalShape] = useState('');  // 모달 모양(디자인) 상태 관리
  const [editingMemoId, setEditingMemoId] = useState(null);//수정 상태 관리


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
    navigate(`/postit/${id}/`);
  };

  // 홈 페이지로 이동하는 함수
  const goToHome = () => {
    navigate('/');
  };

  // 메모 클릭 핸들러 함수
  const handleMemoClick = (memo) => {
    setModalContent(memo.content);
    setEditingMemoId(memo.id);
    setIsModalOpen(true);
    setModalShape(memo.shape);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    setEditingMemoId(null);
  };

  // 메모 수정 페이지로 이동하는 함수
const handleEditClick = () => {
  navigate(`/postit/${editingMemoId}?edit=true`);
  setIsModalOpen(false);
};

// 메모 삭제 함수
const handleDeleteClick = (memoId) => {
  axios.delete(`/memo/${memoId}`)
    .then(() => {
      alert("메모가 삭제되었습니다.");
      setIsModalOpen(false); // 모달 닫기
      setMemos(memos.filter(memo => memo.id !== memoId)); // 삭제된 메모를 목록에서 제거
    })
    .catch(error => {
      console.error("메모 삭제 중 에러 발생:", error);
      alert("메모 삭제에 실패했습니다.");
    });
};




  return (
    <div className='wrap'>
      <h2>{name}에게 포스트잇을 붙여봐!</h2>
      <div className='btns'>
        <button className='btn' onClick={goToCreateMemo}>📝 Memo</button>
        <button className='btn' onClick={goToHome}>🏠 Home</button>
      </div>

      {/* 메모 목록 표시 영역 */}
      <div className='notebook'>
        {memos.length ? (
          <div className="notes-container">
            {memos.map(memo => (
              <div
                className={`note ${memo.shape}`} // memo.shape 값에 따라 'note square' 또는 'note heart' 클래스 적용
                key={memo.id}
                onClick={() => handleMemoClick(memo)}
              >
                <div className='writer'>{memo.writer}</div>
                <div className='content'>{memo.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-message">{name}님께 첫 번째 메모를 남겨보세요!</div>
        )}
      </div>

      {/* 모달이 열렸을 때 표시될 컨텐츠 */}
      {isModalOpen && (
        <Modal
          className={`MemoDetail-content ${modalShape === 'heart' ? 'heart' : ''}`}
          content={modalContent}
          onClose={closeModal}
          onDelete={() => handleDeleteClick(editingMemoId)}
          onEdit={() => handleEditClick(editingMemoId)}
        />
      )}

      {/* 키보드와 마우스 이미지 */}
      <div className='km'>
        <img className='keyboard' src={keyboard} alt="keyboard" />
        <img className='mouse' src={mouse} alt="mouse" />
      </div>
    </div>
  );

}


export default Memo;