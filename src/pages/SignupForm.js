import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
`;

function SignupForm() {
  const [currentUser, setCurrentUser] = useState(null);
  const { getUserInfo } = useAuth();

  // 서버에 사용자 정보 요청
  const updateProfile = async () => {
    const user = await getUserInfo();

    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 유효성 검사
  const validate = () => {
    const newErrors = {};
    if (!formData.userid.trim()) newErrors.userid = "아이디를 입력해주세요.";
    if (!formData.username.trim()) newErrors.username = "이름을 입력해주세요.";
    if (!formData.email.includes("@"))
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    if (formData.password.length < 6)
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    return newErrors;
  };

  // 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("회원가입 데이터:", formData);
      alert("회원가입이 완료되었습니다!");
      // 실제로는 이 자리에서 서버로 데이터 전송 (API 호출)
    }
  };

  return (
    <Wrapper>
      <div style={styles.container}>
        <h2 style={styles.title}>회원가입</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>아이디</label>
          <input
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.userid && <p style={styles.error}>{errors.userid}</p>}

          <label style={styles.label}>이름</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.username && <p style={styles.error}>{errors.username}</p>}

          <label style={styles.label}>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <label style={styles.label}>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <label style={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && (
            <p style={styles.error}>{errors.confirmPassword}</p>
          )}

          <button type="submit" style={styles.button}>
            회원가입
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

// 간단한 인라인 스타일
const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
    padding: "50px",
    border: "10px solid tan",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4c2a2a",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0px 10px 0px",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: "10px",
  },
};

export default SignupForm;
