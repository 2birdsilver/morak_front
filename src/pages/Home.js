import React, { useEffect, useState } from 'react';
import Desk from '../components/Desk.js';
import { useNavigate  } from 'react-router-dom'
import '../App.css';

function Home() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    const goToMemos = (member) => {
      navigate(`/memo/${member.id}`);
    };

    useEffect(() => {
      fetch('/members')
        .then((response) => response.json())
        .then((data) => setMembers(data))
        .catch((error) => console.error("Fetching members failed", error));
    }, []);

    return (
      <div className="home">
        <div className='title_box'>
          <div className='logo'>KCC정보통신</div>
          <div className='title'>Happy Desk</div>
          <div className='text'>책상을 클릭한 후 포스트잇에 메모를 남겨보세요!</div>
        </div>
        <div className='container'>
          {members.map((member) => (
            <Desk key={member.id} member={member} onClick={() => goToMemos(member)} />
            ))}
        </div>
      </div>
    );
  }

export default Home
