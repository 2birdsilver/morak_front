import React, { useEffect, useState } from 'react';
import Desk from '../components/Desk.js';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용

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
      console.log("token: " + token);
    }

    function searchParam(key) {
      return new URLSearchParams(location.search).get(key);
    }
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
