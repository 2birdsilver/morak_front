import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import keyboard from '../images/keyword.png';
import mouse from '../images/mouse.png';
import Modal from '../components/MemoDetail';
import PasswordModal from '../components/PasswordModal';
// import axios from "axios";


function Memo() {
  const { id } = useParams(); // URL에서 id 값을 가져오기
  const navigate = useNavigate(); // 페이지 네비게이션을 위한 Hook
  const [memos, setMemos] = useState([]); // 메모 목록 상태 관리
  const [name, setName] = useState(''); // 사용자 이름 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [modalContent, setModalContent] = useState(''); // 모달에 표시될 내용 관리
  const [modalDate, setModalDate] = useState(''); // 모달에 표시될 날짜 관리
  const [modalWriter, setModalWriter] = useState(''); 
  const [modalShape, setModalShape] = useState('');  // 모달 모양(디자인) 상태 관리
  const [editingMemoId, setEditingMemoId] = useState(null);//수정 상태 관리
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);


  useEffect(() => {
    fetchUserInfo();
    fetchMemoData();
  }, [id]);

  const fetchUserInfo = () => {
    // 사용자 정보를 불러오는 API 호출
    fetch(`/members/${id}`)
    .then(response => response.json())
    .then(data => setName(data.name))
    .catch(error => console.error("사용자 정보를 불러오는 중 에러 발생:", error));
  }

  const fetchMemoData = () => {
    // 메모 데이터를 불러오는 API 호출
    fetch(`/api/memo/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('메모를 불러오는 데 실패했습니다.');
      }
      return response.json();
    })
    .then(data => setMemos(data))
    .catch(error => console.error("메모 데이터를 불러오는 중 에러 발생:", error));
  }

  // 메모 작성 페이지로 이동하는 함수
  const goToCreateMemo = () => {
    navigate(`/postit/${id}/`);
  };

  // 홈 페이지로 이동하는 함수
  const goToHome = () => {
    navigate('/');
  };

  // 프린트
  const getPrintPaper = () => {
      // 'notebook' 클래스를 가진 요소의 HTML을 찾아냅니다.
    const notebookElement = document.querySelector('.notebook').innerHTML;

    // 새로운 팝업 창을 생성합니다.
    const printWindow = window.open('', '_blank');

    // 팝업 창에 HTML을 작성합니다. 필요한 스타일을 <style> 태그를 통해 추가할 수 있습니다.
    printWindow.document.write(`
      <html>
        <head>
          <title>${name}에게</title>
          <style>
            /* 프린트할 내용의 스타일을 여기에 추가합니다. */
            body {
              font-family: "omyu-pretty";
              margin: 0;
              padding: 50px;
            }
            .notebook {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #ffefc1; /* 편지지 배경색 */
              border: 2px solid #f9d6b1; /* 테두리 색상 */
              border-radius: 8px; /* 테두리 둥글게 */
              box-shadow: 0 0 10px rgba(0,0,0,0.2); /* 그림자 효과 */
            }
            .note {
              margin-bottom: 20px;
              padding: 15px;
              background: #ffffff; /* 메모 배경색 */
              border: 1px solid #f9d6b1; /* 메모 테두리 색상 */
              border-radius: 5px; /* 메모 테두리 둥글게 */
              box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 메모 그림자 효과 */
            }
            .writer {
              font-size: 1.2em;
              color: #de8f6e; /* 작성자 이름 색상 */
              margin-bottom: 10px; /* 여백 추가 */
            }
            .m-content {
              font-size: 1em;
              line-height: 1.5;
              color: #333; /* 내용 색상 */
              text-align: left; /* 텍스트 정렬 */
            }
          </style>
        </head>
        <body>
          <h1 className='m-name'>${name} 에게</h1>
          ${notebookElement} <!-- 프린트할 내용 -->
        </body>
      </html>
    `);

    printWindow.document.close(); // 문서 작성을 마칩니다.
    printWindow.focus(); // 프린트 창에 포커스를 맞춥니다.

    // 짧은 딜레이 후에 프린트 창에서 프린트 다이얼로그를 엽니다.
    setTimeout(() => {
      printWindow.print(); // 프린트 다이얼로그를 엽니다.
      printWindow.close(); // 프린트 후 팝업 창을 닫습니다.
    }, 250);
  }

  // 메모 클릭 핸들러 함수
  const handleMemoClick = (memo) => {
    setModalDate(memo.date);
    setModalContent(memo.content);
    setModalWriter(memo.writer)
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

  // 메모 삭제 함수 수정
  const handleDeleteClick = (memoId) => {
    setIsPasswordModalOpen(true);
    setEditingMemoId(memoId);
  };

  // 비밀번호 모달에서 확인을 눌렀을 때 실행될 함수
  const handlePasswordConfirm = async (password) => { 
    console.log("입력된 비밀번호:", password);
    console.log("입력된 메모id:", editingMemoId);
    // 비밀번호와 메모 ID를 서버에 전송
    try {
      const response = await fetch('/api/memo/delete', {
        method: 'POST', // 메소드를 DELETE로 변경
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memoId: editingMemoId, // 삭제하려는 메모의 ID
          password: password, // 사용자가 입력한 비밀번호
        }),
      });

      if (response.status === 202) {
        alert("메모를 삭제하였습니다.");
        closeModal();
        setMemos(memos.filter(memo => memo.id !== editingMemoId));
      } else if (response.status === 401) {
        alert("비밀번호를 잘못 입력하였습니다. 비밀번호 문의는 leesu@kcc.co.kr");
      } else {
        // 그 외의 경우, 일반적인 에러 처리
        alert("메모 삭제 실패: 알 수 없는 에러 발생");
      }
    } catch (error) {
      console.error("메모 삭제 요청 중 오류 발생", error);
      alert("메모 삭제 과정에서 오류가 발생했습니다.");
      // 네트워크 오류 또는 요청 실패 처리
    }
    
    // 비밀번호 입력이 완료되면 모달을 닫음
    setIsPasswordModalOpen(false); 
  };




  return (
    <div className='wrap memo'>
      <h2>{name}에게 포스트잇을 붙여봐!</h2>
      <div className='btns'>
        <button className='btn' onClick={goToHome}>🏠 Home</button>
        <button className='btn' onClick={getPrintPaper}>📩 Print</button>
        <button className='btn' onClick={goToCreateMemo}>📝 Memo</button>
      </div>

      {/* 메모 목록 표시 영역 */}
      <div className='notebook'>
        {memos.length ? (
          <div className="notes-container">
            {memos.map(memo => (
              <div
                className={`note ${memo.shape} ${memo.color}`} // memo.shape 값에 따라 'note square' 또는 'note heart' 클래스 적용
                key={memo.id}
                onClick={() => handleMemoClick(memo)}
              >
                <div className='writer'>{memo.writer}</div>
                <div className='m-content'>{memo.content}</div>
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
          date={modalDate}
          writer={modalWriter}
          onClose={closeModal}
          onDelete={() => handleDeleteClick(editingMemoId)}
          onEdit={() => handleEditClick(editingMemoId)}
        />
      )}

      {isPasswordModalOpen && (
              <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onConfirm={handlePasswordConfirm}
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