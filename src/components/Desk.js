import React from 'react';
import '../App.css';

//props로 member 객체와 onClick 함수를 받음
function Desk({ member, onClick }) {
  return (
    <div className='member'>

      {/* 멤버 사진 표시 */}
      <div className='photo'>
        {/* member 객체의 photoUrl 속성이 있으면 이미지를 표시, 없으면 '사진 없음' 텍스트 표시 */}
        {member.photoUrl ? (
          <img src={member.photoUrl} alt={`${member.name}'s photo`} />
        ) : (
          <div>사진 없음</div>
        )}
      </div>
      {/* 멤버의 이름과 소개*/}
      <div className='intern'>
        <div className='intern_name'>{member.name}</div>
        <div className='intern_intro'>{member.introduction}</div>
        <button onClick={onClick}>메모 보기</button>

      </div>
    </div>
  );
}

export default Desk;
