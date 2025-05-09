import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook"

const DetailedBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError } = useBook(id)

  if (!bookData) return null;

  return (
    <div className="w-full">
      <div className="bg-spearmint relative h-64 px-5 py-8 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-1">{bookData.title}</h1>
        <p className="text-sm mb-3">{bookData.author}</p>
        <img
          src={bookData.cover}
          alt={bookData.title}
          className="w-60 absolute left-5 top-28 rounded-lg shadow-xl"
        />
      </div>
      <div className="flex flex-col items-center px-5 pt-60 pb-12 gap-6">
        <p className="text-base text-center">{bookData.description}</p>
      </div>
    </div>
  );
};

export default DetailedBook;
