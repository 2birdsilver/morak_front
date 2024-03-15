import React, { useEffect, useState } from 'react';
import Desk from '../components/Desk.js';
import { useNavigate } from 'react-router-dom';


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
    <div className="wrap">
      <div className='container'>
        {members.map((member) => (
          <Desk key={member.id} member={member} onClick={() => goToMemos(member)} />
        ))}
      </div>
    </div>
  );
}

export default Home;
