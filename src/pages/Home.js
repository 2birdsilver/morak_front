import React, { useEffect, useState } from "react";
import Desk from "../components/Desk.js";
import MemoList from "./MemoList.js";
import { useNavigate } from "react-router-dom";
import memoApi, { getMainMemos } from "../api/memoApi.js";

function Home() {
  const [members, setMembers] = useState([]);
  const [memos, setMemos] = useState([]);
  const navigate = useNavigate();

  // const goToMemos = (memo) => {
  //   navigate(`/memo/${member.id}`);
  // };

  useEffect(() => {
    getMainMemos().then((data) => setMemos(data));
  }, []);

  return (
    <div className="wrap">
      <div className="container">
        <MemoList memoList={memos} />
      </div>
    </div>
  );
}

export default Home;
