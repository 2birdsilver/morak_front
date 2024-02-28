import React from 'react';

//props로 className, content, onClose, onEdit 받기
const MemoDetail = ({ className, content, date, onClose, onEdit, onDelete }) => {

    if (!content) return null;

    return (
        <div className="MemoDetail-backdrop">
            <div className={`MemoDetail-content ${className}`}>
                <div className='date-style'>{date}</div>
                <p>{content}</p>
                <div className="MemoDetail-buttons">
                    <button onClick={onEdit}>수정</button>
                    <button onClick={onDelete}>삭제</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default MemoDetail;