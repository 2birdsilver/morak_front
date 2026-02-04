import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import mypage from "../images/person.png";
import { useAuth } from "../components/AuthContext";

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { getUserInfo } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // 현재 페이지 경로 확인
    const path = location.pathname;

    // 쿼리 파라미터로 받은 access token을 local storage에 저장
    const token = searchParam("token");
    if (token) {
      localStorage.setItem("access_token", token);
      window.location.href = "/";
    }

    function searchParam(key) {
      return new URLSearchParams(window.location.search).get(key);
    }

    // access token으로 서버에 사용자 정보 요청
    const updateProfile = async () => {
      const user = await getUserInfo();

      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    };

    // signup 페이지라면 redirect 로직 무시
    if (path.includes("signup")) {
      window.location.href = "/#/signup";
      return;
    }

    updateProfile(); // 컴포넌트 마운트 시 호출
    window.addEventListener("loginSuccess", updateProfile); // 사용자 정의 이벤트 리스너 추가

    return () => {
      window.removeEventListener("loginSuccess", updateProfile); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [currentUser]);

  const goToHome = () => {
    navigate("/");
  };

  const goLogin = () => {
    navigate("/login");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  // 로그아웃
  const goLogout = () => {
    localStorage.removeItem("access_token");
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  // 메모 작성 페이지로 이동하는 함수
  const goToCreateMemo = () => {
    console.log("goToCreateMemo");
    navigate(`/memo/create`);
  };

  return (
    <div className="header">
      {/* 로그인 기능 숨김 */}
      {/* {currentUser ? (
        <>
          <div className="mypage-icons">
            <div onClick={goMypage}>
              <div>{currentUser.name}</div>
            </div>

            <div className="h-loginout" onClick={goLogout}>
              로그아웃
            </div>
          </div>
        </>
      ) : (
        <div className="h-login" onClick={goLogin}>
          로그인
        </div>
      )} */}

      {/* 메모작성버튼 */}
      <button className="add-memo" onClick={goToCreateMemo}>
        방명록 생성
      </button>

      <div>
        <div className="title" onClick={goToHome}>
          모락 (모두의 낙서)
        </div>
        <div className="text">자유롭게 메모를 남겨보세요!</div>
      </div>

      <div></div>
    </div>
  );
}

export default Header;
