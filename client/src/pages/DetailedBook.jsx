import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import Loading from "../components/loading";
import { useEffect } from "react";
import Heart from "../components/Heart";

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
      <div className="bg-spearmint relative h-auto px-5 py- mb-70 sm:mb-15 flex flex-col items-start p-5 sm:min-h-100 sm:flex-row-reverse sm:items-center sm:gap-5 md:gap-10 lg:gap-20 sm:justify-center sm:px-40 pb-35 sm:pb-10">
        {/* Title and Author */}
        <div className="flex flex-col md:ml-16">
          <h1 className="text-2xl font-bold mb-1 break-words">{bookData.title}</h1>
          <p className="text-sm mb-3">{bookData.author}</p>
        </div>
        
        {/* Book Cover */}
        <img
          src={bookData.cover}
          alt={bookData.title}
          className="w-60 h-90 md:w-60 md:h-90 -mb-60 sm:-mb-0 md:mt-0 rounded-lg shadow-xl absolute sm:static bottom-0 border-hotpink border-2"
        />
        <div className="absolute bottom-7 right-3 h-10 flex items-center justify-center scale-120">
          
        <Heart book={bookData} />
        </div>
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
