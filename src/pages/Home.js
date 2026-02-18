import React, { useEffect, useState } from "react";
import Desk from "../components/Desk.js";
import { useNavigate } from "react-router-dom";
import guestbookApi, { fetchMainGuestbooks } from "../api/guestbookApi.js";
import SearchBox from "../components/guestbook/SearchBox.js";
import Section from "../components/guestbook/Section";

function Home() {
  const [members, setMembers] = useState([]);
  const [guestbooks, setguestbooks] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sections, setSections] = useState([]);

  // const goToguestbooks = (guestbook) => {
  //   navigate(`/guestbook/${member.id}`);
  // };

  /**
   *
   * 첫 로딩 시 섹션별 방명록 리스트 조회
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMainGuestbooks();
        setSections(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [searchKeyword]);

  // 낙서장 페이지로 이동하는 함수
  const goToCreateguestbookpad = () => {
    navigate(`/guestbookpad/{userId}`);
  };

  // 검색함수
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="wrap">
      <div className="container">
        {/* <button className="guestbookpad" onClick={goToCreateguestbookpad}>
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
              guestbooks={section.guestbookMainPageDtoList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
