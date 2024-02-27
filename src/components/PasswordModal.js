import React, { useState } from 'react';
import '../css/PasswordModal.css'; // CSS 파일 경로 확인 필요

function PasswordModal({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="password-modal-overlay" onClick={onClose}>
      <div className="password-modal" onClick={(e) => e.stopPropagation()}>
        <input
          type="password"
          placeholder="비밀번호 입력"
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

export default PasswordModal;
