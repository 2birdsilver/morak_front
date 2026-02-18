import axiosInstance from "./axiosInstance";

/**
 * 메인화면의 섹션별 방명록리스트 조회
 *
 * @returns 섹션별(type) 방명록리스트(guestbookMainPageDtoList)의 리스트
 *
 */
export const fetchMainGuestbooks = async () => {
  const response = await axiosInstance.get("/guestbook/");
  return response.data;
};

/**
 * 방명록ID에 따른 상세보기
 *
 * @param {*} section
 * @returns guestbooks
 *
 */
export const fetchGuestbookDetail = async (id) => {
  const response = await axiosInstance.get(`/guestbook/${id}`);
  return response.data;
};

/**
 *메인화면의 섹션별 방명록리스트 조회
 *
 * @param {*} section
 * @returns guestbooks
 *
 */
export async function getguestbooksBySection({ section }) {
  // 검색키워드가 있는 경우
  const params = new URLSearchParams();
  if (section) params.append("keyword", section);

  const response = await fetch(`/api/memo/main?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}

/**
 *
 * @param {*} param0
 * @returns
 *
 *
 */

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
