import React from 'react';
// import '../App.css'; // 혹은 적절한 CSS 파일 경로

function Desk({ member, onClick }) {
  return (
    <div className='member' onClick={onClick}>
      {member.photoUrl ? (
        <img src={member.photoUrl} className='photo' alt={`${member.name}'s photo`} />
      ) : (
        <div>사진 없음</div>
      )}
      <div className='intern'>
        <div className='intern_name'>{member.name}</div>
        <div className='intern_intro'>{member.introduction}</div>
      </div>
    </div>
  );
}

export default Desk;
