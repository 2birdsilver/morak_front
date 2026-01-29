import { useState } from "react";

function SearchBox({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        value={keyword}
        placeholder="검색어를 입력하세요"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchBox;
