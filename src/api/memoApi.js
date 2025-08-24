// 메인에 표출되는 메모리스트 조회
export async function getMainMemos() {
  const response = await fetch("/api/memo/main");

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}

// 메모 조회
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
