// 메인에 표출되는 메모리스트 조회
export async function getMainMemos({ keyword }) {
  // 검색키워드가 있는 경우
  const params = new URLSearchParams();
  if (keyword) params.append("keyword", keyword);

  const response = await fetch(`/api/memo/main?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}

// 메모 조회(메모ID)
export async function getMemoById({ id }) {
  try {
    const response = await fetch(`/api/memo/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  } catch (error) {
    console.error("에러 발생:", error); // 객체 전체
    console.error("메시지:", error.message); // 에러 메시지
  }
}

// 메모 생성
export async function createMemo(formData) {
  try {
    const response = await fetch("/api/memo", {
      method: "PUT",
      body: FormData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  } catch (error) {
    console.error("에러 발생:", error); // 객체 전체
    console.error("메시지:", error.message); // 에러 메시지
  }
}
