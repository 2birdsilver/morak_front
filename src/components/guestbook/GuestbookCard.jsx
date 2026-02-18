function GuestbookCard({ guestbook }) {
  return (
    <div className="card">
      <h3>{guestbook.title}</h3>
      <p>{guestbook.owner}</p>
    </div>
  );
}

export default GuestbookCard;
