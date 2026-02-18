import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGuestbookDetail, getMemoById } from "../api/guestbookApi";
import MemoList from "../components/guestbook/MemoList";
import Button from "../components/layout/Button";

function GuestbookDetailPage() {
  const { id } = useParams();
  const [guestbook, setGuestbook] = useState(null);

  useEffect(() => {
    fetchGuestbookDetail(id).then(setGuestbook);
  }, [id]);

  if (!guestbook) return <div>로딩중...</div>;

  return (
    <div>
      <div>
        <h1>{guestbook.guestbook.title}</h1>
        <p>{guestbook.guestbook.introduction}</p>
        <p>작성자: {guestbook.guestbook.owner}</p>
      </div>
      <div>
        <Button title="뒤로가기" />
        <Button title="메모작성" />
      </div>
      <MemoList memoList={guestbook.memos} />
    </div>
  );
}

export default GuestbookDetailPage;
