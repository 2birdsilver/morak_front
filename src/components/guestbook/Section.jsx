import { useRef } from "react";
import GuestbookCard from "./GuestbookCard";

function Section({ type, guestbooks }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  return (
    <div className="section">
      <h2 className="section-title">{type}</h2>

      <div className="slider-wrapper">
        <button className="arrow left" onClick={scrollLeft}>
          ◀
        </button>

        <div className="card-row" ref={scrollRef}>
          {guestbooks.map((g) => (
            <GuestbookCard key={g.id} guestbook={g} />
          ))}
        </div>

        <button className="arrow right" onClick={scrollRight}>
          ▶
        </button>
      </div>
    </div>
  );
}

export default Section;
