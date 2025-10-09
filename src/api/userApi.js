import React from "react";

// 회원 컨텍스트
const UserContext = React.createContext();
UserContext.displayName = "UserContext";

// 소셜로그인(카카오)
export async function kakaoLogin() {
  const response = await fetch("/oauth2/authorization/kakao");

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}

export default UserContext;
