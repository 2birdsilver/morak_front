import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/user/AuthContext";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/layout/Button";

function GuestbookForm() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goback = () => {
    navigate(-1);
  };

  const { getUserInfo } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticatedWriter, setAuthenticatedWriter] = useState(null);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [shape, setShape] = useState("square");
  const [color, setColor] = useState("beige");
  const [recipient, setRecipient] = useState(false);

  const [memoId, setMemoId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const maxWriterLength = 20;
  const maxLength = 255;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editMode = searchParams.get("edit") === "true";

    if (editMode) {
      setIsEditing(true);
      axios
        .get(`/api/memo/update/${params.id}`)
        .then((res) => {
          const { writer, introduction, shape, color } = res.data;
          setWriter(writer);
          setIntroduction(introduction);
          setShape(shape);
          setColor(color);
          setMemoId(params.id);
          // 비밀번호 관련 처리는 상황에 따라 다름
        })
        .catch((err) => console.error("Error fetching memo data:", err));
    } else {
      setRecipient(params.id);
    }

    // 페이지가 마운트될 때 사용자 정보 업데이트
    updateProfile();
  }, [params.id, location.search]);

  const updateProfile = async () => {
    const user = await getUserInfo();

    if (user) {
      setCurrentUser(user);
      setAuthenticatedWriter(user.id);
    } else {
      setCurrentUser(null);
    }
  };

  const handlePostitSubmit = async (e) => {
    e.preventDefault();

    const memoData = {
      writer,
      title,
      introduction,
      password,
      tag,
    };

    const headData = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    };

    if (isEditing) {
      // 수정 로직
      axios
        .put(`/api/memo/${memoId}`, memoData, headData)
        .then((res) => {
          alert("포스트잇 수정을 완료하였습니다.");
          navigate(-1); // 또는 수정 후 보여줄 페이지로 이동
        })
        .catch((err) => {
          alert("포스트잇 수정이 실패하였습니다.");
          console.log(err);
        });
    } else {
      // 등록 로직
      axios
        .post("/api/memo", memoData, headData)
        .then((res) => {
          alert("포스트잇 등록을 완료하였습니다.");
          navigate(-1);
        })
        .catch((err) => {
          alert("포스트잇 등록을 실패하였습니다.");
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Container>
        <form className="guestbook-form" onSubmit={handlePostitSubmit}>
          <FormGroup>
            <Label htmlFor="writer">작성자</Label>
            <TextInput
              id="writer"
              height={20}
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <TextInput
              id="password"
              height={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="title">제목</Label>
            <TextInput
              id="title"
              height={20}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="introduction">소개글</Label>
            <TextInput
              id="introduction"
              height={100}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="tag">태그</Label>
            <TextInput
              id="tag"
              height={20}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </FormGroup>

          <div>
            <Button
              title="뒤로가기"
              onClick={() => {
                navigate("/");
              }}
            />
            <SubmitButton type="submit">등록하기</SubmitButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default GuestbookForm;

// -----------------------------
// Styled Components
// -----------------------------
const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  margin-bottom: 16px;
`;

const Label = styled.label`
  width: 100px; /* 라벨 너비 고정 */
  font-weight: 600;
  color: #333;
  margin-right: 12px; /* 입력폼과 간격 */
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #333;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
`;
