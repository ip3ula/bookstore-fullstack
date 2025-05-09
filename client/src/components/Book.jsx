import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  const [isCoverValid, setIsCoverValid] = useState(true);

  useEffect(() => {
    if (!book.cover) return setIsCoverValid(false);

    const img = new Image();
    img.onload = () => setIsCoverValid(true);
    img.onerror = () => setIsCoverValid(false);
    img.src = book.cover;
  }, [book.cover]);

  return (
    <div className="w-30 h-45 min-w-30 *:font-bold relative sm:scale-150">
      <Link to={`/books/${book.id}`}>
        {isCoverValid ? (
          <img className="w-30 h-45 rounded-md" src={book.cover} />
        ) : (
          <div className="w-30 h-45 rounded-md bg-rosewater flex items-center justify-center p-2 text-center font-bold">
            <p>{book.title}</p>
          </div>
        )}
      </Link>

      <svg
        onClick={() => {
          find
            ? console.log("already in favorites")
            : console.log("added to favorites");
        }}
        className={`size-7 absolute top-2 ml-21 rounded p-1 ${
          find
            ? "bg-spearmint text-stone-900 fill-stone-900"
            : "bg-hotpink text-white"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
};

export default Book;
