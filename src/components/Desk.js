import React, {useState} from 'react';

// 팝업 모달 컴포넌트
function Modal({ content, name, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{name}</p>
        <p>{content}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

//props로 member 객체와 onClick 함수를 받음
function Desk({ member, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

    // "더보기" 클릭 핸들러
    const handleReadMoreClick = (e) => {
      e.stopPropagation(); // Desk의 onClick 이벤트가 발생하지 않도록 방지
      setIsModalOpen(true);
    };
  
    // 모달 닫기 핸들러
    const handleCloseModal = (e) => {
      e.stopPropagation(); 
      setIsModalOpen(false);
    };

  return (
    <div className='member' onClick={onClick}>
      {member.photoUrl ? (
        <img src={member.photoUrl} className='photo' alt={`${member.name}'s profile`} />
      ) : (
        <div>사진 없음</div>
      )}
      <div className='intern'>
        <div className='intern_name'>{member.name}</div>
        <div className='intern_intro'>
        {member.introduction.length > 20 ? (
            <>
              <div>{member.introduction.substring(0, 20)}... 
                <button onClick={handleReadMoreClick} className='intern__btn-more'>더보기</button>
              </div>
             
            </>
          ) : (
            member.introduction
          )}
        </div>
      </div>
      {isModalOpen && <Modal content={member.introduction} name={member.name} onClose={handleCloseModal} />}
    </div>
  );
}

export default Desk;
