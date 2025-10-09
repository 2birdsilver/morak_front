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

  // 메모 작성 페이지로 이동하는 함수
  const goToCreateMemo = () => {
    console.log("goToCreateMemo");
    navigate(`/memo/create`);
  };

  // 낙서장 페이지로 이동하는 함수
  const goToCreateMemopad = () => {
    navigate(`/memopad/{memopadId}`);
  };

  return (
    <div className="wrap">
      <div className="container">
        <button className="add-memo" onClick={goToCreateMemo}>
          낙서하기
        </button>
        <button className="memopad" onClick={goToCreateMemopad}>
          내 낙서장
        </button>

        <MemoList memoList={memos} />
      </div>
    </div>
  );
}

export default Home;
