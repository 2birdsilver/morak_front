import { useRef } from "react";

export function Section({ title, type }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2>{title}</h2>
      <HorizontalGuestbookList type={type} />
    </section>
  );
}

export function HorizontalGuestbookList({ type }) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        overflowX: "auto",
        gap: 16,
        paddingBottom: 8,
      }}
    >
      {/* PostCard들이 들어감 */}
    </div>
  );
}

export function Guestbook({ guestbook }) {
  return (
    <div style={{ minWidth: 200 }}>
      <img src={guestbook.thumbnail} alt="" />
      <p>{guestbook.title}</p>
    </div>
  );
}
