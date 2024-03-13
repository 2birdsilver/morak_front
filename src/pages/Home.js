import React, { useEffect, useState } from 'react';
import Desk from '../components/Desk.js';
import { useNavigate, useLocation } from 'react-router-dom';


function Home() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  

  const goToMemos = (member) => {
    navigate(`/memo/${member.id}`);
  };

  useEffect(() => {
    fetch('/members')
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Fetching members failed", error));

    const token = searchParam('token');
    if (token) {
      localStorage.setItem("access_token", token);
    }

    function searchParam(key) {
      return new URLSearchParams(window.location.search).get(key);
    }

  }, [location]);

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
