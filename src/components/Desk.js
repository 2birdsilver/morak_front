// src/components/Desk.js

import React from 'react';
import '../App.css'; // 혹은 적절한 CSS 파일 경로

function Desk({ member, onClick }) {
  return (
    <div className='member'>
    <div className='photo'>
      {member.photoUrl ? (
        <img src={member.photoUrl} alt={`${member.name}'s photo`} />
      ) : (
        <div>사진 없음</div>
      )}
    </div> 
      <div className='intern'>
        <div className='intern_name'>{member.name}</div>
        <div className='intern_intro'>{member.introduction}</div>
        <button onClick={onClick}>메모 보기</button>

      </div>
    </div>
  );
}

export default Desk;
