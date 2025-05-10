import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { useBooks } from "../hooks/useBooks"; 

const SearchItem = ({ title, id, onClick }) => {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, errorMessage } = useSearch(searchQuery);
  const { trending: books, isLoading: isLoadingBooks } = useBooks('all');
  console.log('books', books)

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    if (data) {
      setResults(data);
    } 
  }, [data]);

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
  };

  return (
    <div className="bg-spearmint p-10 fixed w-screen h-screen top-0 left-0 z-50 overflow-y-auto">
      <div className=" max-w-150 mx-auto">

      <div className="flex items-center justify-cednter gap-5 ">
        <input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          className="w-full h-10 px-4 rounded-3xl bg-white text-black border border-hotpink focus:outline-none focus:ring-2 focus:ring-hotpink" 
        />
        <button onClick={() => navigate('/')}>Cancel</button>
      </div>

      {isLoading && isLoadingBooks && <p>Loading...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {results.length > 0 ? (
        <div>
          {results && results.map((book) => (
            <SearchItem
              key={book.id}
              id={book.id}
              title={book.title}
              onClick={() => navigate(`/books/${book.id}`)} 
            />
          ))}
        </div>
      ) : (
        searchQuery && !isLoading && <p>No results found</p>
      )}
      <div className="mb-10">

      {!searchQuery  && books.slice(0, 7).map((book) => (
            <SearchItem
              key={book.id}
              id={book.id}
              title={book.title}
              onClick={() => navigate(`/books/${book.id}`)} 
            />
          ))}
      </div>

      <button onClick={clearSearch} className="mt-4 px-4 py-2 bg-hotpink rounded-3xl text-white sm:mx-auto block sm:w-50 sm:mt-20">
        Clear Search
      </button>
      </div>
    </div>
  );
};

export default Search;
