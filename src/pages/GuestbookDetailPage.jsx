import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGuestbookDetail } from "../api/guestbookApi";

function GuestbookDetailPage() {
  const { id } = useParams();
  const [guestbook, setGuestbook] = useState(null);

  useEffect(() => {
    fetchGuestbookDetail(id).then(setGuestbook);
  }, [id]);

  if (!guestbook) return <div>로딩중...</div>;

  return (
    <div>
      <h1>{guestbook.title}</h1>
      <p>{guestbook.introduction}</p>
      <p>작성자: {guestbook.owner}</p>
    </div>
  );
}

export default GuestbookDetailPage;
