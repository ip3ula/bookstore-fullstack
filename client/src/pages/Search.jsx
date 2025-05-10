import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";

const SearchItem = ({ title,id , onClick }) => {
  return (
    <div className="flex items-center py-3 first:pt-10 justify-center mx-auto max-w-150">
      <div className="flex-1 flex items-center gap-3 max-w-125">
        <Link to={`/books/${id}`}>
        <p>{title}</p>
        </Link>
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
  const navigate = useNavigate();
  const { trending: books } = useBooks(search);

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
    <div className="h-screen w-screen bg-spearmint p-5 overflow-y-auto fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center gap-5">
        <div className="relative flex-1 max-w-md">
          <input
            ref={inputRef}
            className="border-2 rounded-4xl p-3 px-5 border-hotpink focus:outline-0 text-sm w-full"
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              type="button"
              className="absolute right-4 top-6 -translate-y-1/2 text-rosewater text-2xl"
            >
              &times;
            </button>
          )}
        </div>

        <button className="font-bold text-lg mx-1" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>

      <div>
        {!search && popular.slice(0, 6).map(book => (
          <SearchItem key={book.title} id={book.id} title={book.title} onClick={() => setSearch(book.title)} />
        ))}
        {search && filtered.slice(0, 7).map(book => (
          <SearchItem key={book.title} title={book.title} id={book.id} onClick={() => setSearch(book.title)} />
        ))}
      </div>
    </div>
  );
};

export default Search;
