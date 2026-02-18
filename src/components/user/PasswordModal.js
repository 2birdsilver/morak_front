import React from 'react';

// 사용자가 로그인한 상태인지 여부를 확인하는 함수
const isLoggedIn = () => {
  const accessToken = localStorage.getItem('access_token');
  return !!accessToken; // access_token이 존재하면 true, 없으면 false 반환
};

// 컴포넌트
function PasswordModal({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = React.useState("");

  const handleConfirm = () => {
    onConfirm(password);
    onClose();
  };

  if (isLoggedIn()) {
    return (
      <div className="password-modal-overlay" onClick={onClose}>
        <div className="password-modal" onClick={(e) => e.stopPropagation()}>
          <div>정말 삭제하시겠습니까?</div>
          <div className="buttons-container">
            <button onClick={handleConfirm}>확인</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="password-modal-overlay" onClick={onClose}>
        <div className="password-modal" onClick={(e) => e.stopPropagation()}>
          <input
            type="password"
            placeholder="글작성시 입력했던 비번를 적어주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="buttons-container">
            <button onClick={handleConfirm}>확인</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordModal;
