import { useNavigate } from "react-router-dom";

function GuestbookCard({ guestbook }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/guestbook/${guestbook.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h3>{guestbook.title}</h3>
      <p>{guestbook.owner}</p>
    </div>
  );
}

export default GuestbookCard;
