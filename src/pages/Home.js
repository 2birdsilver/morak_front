import React, { useEffect, useState } from "react";
import Desk from "../components/Desk.js";
import MemoList from "../components/MemoList.js";
import { useNavigate } from "react-router-dom";
import memoApi, { getMainMemos } from "../api/memoApi.js";
import SearchBox from "../components/SearchBox.js";
import {
  Section,
  HorizontalGuestbookList,
  Guestbook,
} from "../components/Guestbook";

function Home() {
  const [members, setMembers] = useState([]);
  const [memos, setMemos] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const sections = [
    { type: "LATEST", title: "최신순" },
    { type: "POPULAR", title: "인기순" },
  ];

  // const goToMemos = (memo) => {
  //   navigate(`/memo/${member.id}`);
  // };

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const data = await getMainMemos({
          keyword: searchKeyword,
        });
        setMemos(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMemos();
  }, [searchKeyword]);

  // 낙서장 페이지로 이동하는 함수
  const goToCreateMemopad = () => {
    navigate(`/memopad/{userId}`);
  };

  // 검색함수
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="wrap">
      <div className="container">
        {/* <button className="memopad" onClick={goToCreateMemopad}>
          내 낙서장
        </button> */}

        {/* 검색창 */}
        <div>
          <SearchBox onSearch={handleSearch} />
        </div>

        {/* 방명록리스트 */}
        <div>
          {sections.map((section) => (
            <Section
              key={section.type}
              type={section.type}
              title={section.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
