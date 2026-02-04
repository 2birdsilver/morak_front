import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import keyboard from "../images/keyboard.png";
import mouse from "../images/mouse.png";
import anonymous from "../images/anonymous-icon3.png";
import authenticated from "../images/authenticated-icon3.png";
import PasswordModal from "../components/PasswordModal";
import keyboardBased from "../images/keyboard.png";
import mouseBased from "../images/mouse.png";
import Memo from "../components/Memo";

function MemoList({ memoList }) {
  const navigate = useNavigate(); // 페이지 네비게이션을 위한 Hook
  const [memos, setMemos] = useState([]); // 메모 목록 상태 관리
  const [name, setName] = useState(""); // 사용자 이름 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [modalDate, setModalDate] = useState(""); // 모달에 표시될 날짜 관리
  const [modalWriter, setModalWriter] = useState("");
  const [modalShape, setModalShape] = useState(""); // 모달 모양(디자인) 상태 관리
  const [editingMemoId, setEditingMemoId] = useState(null); //수정 상태 관리
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [keyboardUrl, setKeyboardUrl] = useState("");
  const [mouseUrl, setMouseUrl] = useState("");

  useEffect(() => {}, []);

  // 메모 작성 페이지로 이동하는 함수
  const goToCreateMemo = (id) => {
    navigate(`/postit/${id}/`);
  };

  // 홈 페이지로 이동하는 함수
  const goToHome = () => {
    navigate("/");
  };

  // 프린트
  const getPrintPaper = () => {
    if (memos) {
      navigate("/print", { state: { memos: memos, name: name } });
    }
  };

  // 메모 클릭 핸들러 함수
  const handleMemoClick = (memo) => {};

  // 모달 닫기 함수
  const closeModal = () => {};

  // 메모 수정 페이지로 이동하는 함수
  const handleEditClick = () => {
    navigate(`/postit/${editingMemoId}?edit=true`);
    setIsModalOpen(false);
  };

  // 메모 삭제 함수 수정
  const handleDeleteClick = (memoId) => {
    setIsPasswordModalOpen(true);
    setEditingMemoId(memoId);
  };

  // 비밀번호 모달에서 확인을 눌렀을 때 실행될 함수
  const handlePasswordConfirm = async (password) => {
    console.log("입력된 비밀번호:", password);
    console.log("입력된 메모id:", editingMemoId);
    // 비밀번호와 메모 ID를 서버에 전송
    try {
      const response = await fetch("/api/memo/delete", {
        method: "POST", // 메소드를 DELETE로 변경
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memoId: editingMemoId, // 삭제하려는 메모의 ID
          password: password, // 사용자가 입력한 비밀번호
        }),
      });

      if (response.status === 202) {
        alert("메모를 삭제하였습니다.");
        closeModal();
        setMemos(memos.filter((memo) => memo.id !== editingMemoId));
      } else if (response.status === 401) {
        alert(
          "비밀번호를 잘못 입력하였습니다. 비밀번호 문의는 leesu@kcc.co.kr"
        );
      } else {
        // 그 외의 경우, 일반적인 에러 처리
        alert("메모 삭제 실패: 알 수 없는 에러 발생");
      }
    } catch (error) {
      console.error("메모 삭제 요청 중 오류 발생", error);
      alert("메모 삭제 과정에서 오류가 발생했습니다.");
      // 네트워크 오류 또는 요청 실패 처리
    }

    // 비밀번호 입력이 완료되면 모달을 닫음
    setIsPasswordModalOpen(false);
  };

  const handleDetailView = (memoId) => {
    navigate(`/memo/${memoId}`);
  };

  return (
    <div className="wrap memo">
      {memoList.map((memo) => (
        <Memo
          key={memo.id}
          memo={memo}
          onClick={() => handleDetailView(memo.id)}
        />
      ))}
    </div>
  );
}

export default MemoList;
