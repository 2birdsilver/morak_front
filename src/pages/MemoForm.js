import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/user/AuthContext";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Memoform = styled.div`
  width: 100%;
  max-width: 720px;

  :not(:last-child) {
    margin-bottom: 16px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MemoForm() {
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
  const [content, setContent] = useState("");
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
          const { writer, content, shape, color } = res.data;
          setWriter(writer);
          setContent(content);
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
      content,
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
    <Wrapper>
      <Container>
        <Button
          title="뒤로가기"
          onClick={() => {
            navigate("/");
          }}
        />
      </Container>

      <Container>
        <form className="post-form" onSubmit={handlePostitSubmit}>
          <TextInput
            height={20}
            value={writer}
            onChange={(event) => {
              setWriter(event.target.value);
            }}
          />

          <TextInput
            height={20}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <TextInput
            height={20}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />

          <TextInput
            height={480}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />

          <TextInput
            height={20}
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
          />

          <button type="submit">등록하기</button>
        </form>
      </Container>
    </Wrapper>
  );
}

export default MemoForm;
