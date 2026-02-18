import GuestbookCard from "./GuestbookCard";

function Section({ type, guestbooks }) {
  return (
    <div className="section">
      <h2 className="section-title">{type}</h2>

      <div className="card-row">
        {guestbooks.slice(0, 6).map((g) => (
          <GuestbookCard key={g.id} guestbook={g} />
        ))}
      </div>
    </div>
  );
}

export default Section;
