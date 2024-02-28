import React, { useState } from 'react';

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

export default PasswordModal;
