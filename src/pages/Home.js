import React from 'react'
import Desk from '../components/Desk.js';
import { useNavigate  } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    const goDetail = () => {
        navigate("/intern");
    }

  return (
    <div className="home">
    <div className='title_box'>
      <div className='logo'>KCC정보통신</div>
      <div className='title'>Happy Desk</div>
      <div className='text'>책상을 클릭한 후 포스트잇에 메모를 남겨보세요!</div>
    </div>
    <div className='container'>
      <Desk onclick={goDetail}/>
      <Desk />
      <Desk />
      <Desk />
      <Desk />
      <Desk />
      <Desk />
      <Desk />
      <Desk />
      <Desk />
    </div>
  </div>
  )
}

export default Home
