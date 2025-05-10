import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heart from "./Heart";

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
    <div className="w-40 min-w-40 aspect-2/3 *:font-bold relative">
      <Link to={`/books/${book.id}`}>
        {isCoverValid ? (
          <img className="w-40 aspect-2/3 rounded-md" src={book.cover} />
        ) : (
          <div className="w-40 aspect-2/3 rounded-md bg-rosewater flex items-center justify-center p-2 text-center font-bold">
            <p>{book.title}</p>
          </div>
        )}
      </Link>

      <Heart book={book}/>
    </div>
  );
};

export default Book;
