import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";

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
    <div style={styles.container}>
      <h2 style={styles.title}>회원가입</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
  );
}

// 간단한 인라인 스타일
const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: "10px",
  },
};

export default SignupForm;
