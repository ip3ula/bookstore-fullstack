import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import Loading from "../components/loading";
import { useEffect } from "react";

const DetailedBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError } = useBook(id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !bookData) {
    return <p>Something went wrong, please try again.</p>;
  }

  return (
    <div className="w-full px- pb-8">
      {/* Book Header */}
      <div className="bg-spearmint relative h-auto px-5 py- mb-45 sm:mb-15 flex flex-col items-start md:flex-row md:items-center max-h-60 p-5 sm:max-h-120 sm:flex-row sm:gap-5 md:gap-10 lg:gap-20 sm:justify-center">
        {/* Title and Author */}
        <div className="flex flex-col md:ml-16">
          <h1 className="text-2xl font-bold mb-1 break-words">{bookData.title}</h1>
          <p className="text-sm mb-3">{bookData.author}</p>
        </div>
        
        {/* Book Cover */}
        <img
          src={bookData.cover}
          alt={bookData.title}
          className="w-40 h-60 md:w-60 md:h-90 mt-4 md:mt-0 rounded-lg shadow-xl"
        />
      </div>

      {/* Book Content */}
      <div className="flex flex-col items-center px-5 gap-6 sm:grid sm:grid-cols-3">
        {/* Description */}
        <p className="text-base text-center mb-6 col-span-2 sm:text-start">{bookData.description}</p>
<div className='flex gap-5 flex-col items-center'>
        {/* Subjects */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {bookData.subjects?.map((subject, index) => (
            <span
              key={index}
              className="bg-spearmint text-sm px-3 py-1 rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>

        {/* Download Button */}
        <a
          href={bookData.epub}
          className="bg-hotpink text-white px-20 py-3 rounded-3xl shadow-md hover:bg-rosewater"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download EPUB
        </a>
      </div>
      </div>
    </div>
  );
};

export default DetailedBook;
