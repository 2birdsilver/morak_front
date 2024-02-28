import React from 'react';

//props로 member 객체와 onClick 함수를 받음
function Desk({ member, onClick }) {
  return (
    <div className='member' onClick={onClick}>
      {member.photoUrl ? (
        <img src={member.photoUrl} className='photo' alt={`${member.name}'s profile`} />
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
