import React from 'react';

//props로 className, content, onClose, onEdit 받기
const MemoDetail = ({ className, content, date, writer, onClose, onEdit, onDelete }) => {

    if (!content) return null;

    const formatDateSimple = (dateString) => {
        return dateString.replace('T', ' ');
      };
     // 날짜 포맷팅
     const formattedDate = formatDateSimple(date); 

    return (
        <div className="MemoDetail-backdrop">
            <div className={`MemoDetail-content ${className}`}>
                <div className='memo_info'>
                    <div className='writer-style'>from. {writer}</div>
                    <div className='date-style'>{formattedDate}</div>
                </div>
                <div className='content-style'>{content}</div>
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