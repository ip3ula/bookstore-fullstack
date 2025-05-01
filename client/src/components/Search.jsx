import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import CategoryContext from "../CategoryContext";

const SearchItem = ({ title, onClick }) => {
  return (
    <div className="flex items-center py-3 first:pt-10 justify-center mx-auto max-w-150">
      <div className="flex-1 flex items-center gap-3 max-w-125">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <p>{title}</p>
      </div>
      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 rotate-180 text-stone-400 cursor-pointer"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
      </svg>
    </div>
  );
};

const Search = () => {
  const [search, setSearch] = useState("");
  const [,,books] = useContext(CategoryContext);
  const navigate = useNavigate();

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!books || books.length === 0) return null;

  const popular = [...books].sort((a, b) => b.weeklyView - a.weeklyView);

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <div className="h-screen w-screen bg-spearmint p-5 overflow-y-auto">
      <div className="flex justify-center items-center gap-10">
        <div className="relative flex-1 max-w-md">
          <input
            ref={inputRef}
            className="border-2 rounded-4xl p-2 px-5 border-hotpink focus:outline-0 text-sm font-mono w-full"
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              type="button"
              className="absolute right-4 top-4.5 -translate-y-1/2 text-roseWater text-2xl"
            >
              &times;
            </button>
          )}
        </div>

        <button className="font-mono text-lg" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>

      <div>
        {!search && popular.slice(0, 7).map(book => (
          <SearchItem key={book.title} title={book.title} onClick={() => setSearch(book.title)} />
        ))}
        {search && filtered.slice(0, 7).map(book => (
          <SearchItem key={book.title} title={book.title} onClick={() => setSearch(book.title)} />
        ))}
      </div>
    </div>
  );
};

export default Search;
