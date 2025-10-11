import React from "react";

// 소셜로그인(카카오)
export async function kakaoLogin() {
  const response = await fetch("/oauth2/authorization/kakao");

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}
