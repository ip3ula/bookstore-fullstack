import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import CategoryContext from "../CategoryContext";
import { Star } from "lucide-react"; // You can replace with your own icon set

const DetailedBook = () => {
  const { id } = useParams();
  const [state] = useContext(CategoryContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  if (!state) return null;

  const book = state.find((b) => b.id === id);
  if (!book) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-spearmint relative h-64 px-5 py-8 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
        <p className="text-sm mb-3">{book.author}</p>
        <img
          src={book.cover}
          alt={book.title}
          className="w-60 absolute left-5 top-28 rounded-lg shadow-xl"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center px-5 pt-60 pb-12 gap-6">
        <p className="text-base text-center">{book.description}</p>

        {/* Price & Action Buttons */}
        <div className="w-full space-y-2">
          <p className="text-lg font-bold">Price: ${book.price}</p>
          <button className="bg-hotpink text-white py-2 w-full rounded-3xl">
            Add to Cart
          </button>
          <button className="bg-hotpink text-white py-2 w-full rounded-3xl">
            Buy This Book
          </button>
        </div>

        {/* Book Details */}
        <div className="w-full mt-4">
          <h2 className="text-lg font-bold mb-2">Details</h2>
          <table className="w-full text-sm border-t border-gray-200">
            <tbody>
              <tr>
                <td className="font-semibold py-1">Publisher:</td>
                <td>{book.publisher}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">ISBN:</td>
                <td>{book.isbn}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Pages:</td>
                <td>{book.pages}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Language:</td>
                <td>{book.language}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Published:</td>
                <td>{book.published}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Weekly Views:</td>
                <td>{book.weeklyView}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Rating Section */}
        <div className="w-full mt-6">
          <h2 className="text-xl font-bold mb-2">Rate this Book</h2>
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  <Star
                    fill={
                      currentRating <= (hover || rating)
                        ? "#ffba5a"
                        : "none"
                    }
                    stroke="#ffba5a"
                    className="w-6 h-6"
                  />
                </button>
              );
            })}
          </div>
          <p className="text-sm mt-1">
            {rating > 0 ? `You rated this ${rating} star(s)` : "No rating yet"}
          </p>
        </div>

        {/* Comment Section */}
        <div className="w-full mt-6">
          <h2 className="text-xl font-bold mb-2">Leave a Comment</h2>
          <textarea
            placeholder="Write your comment here..."
            className="w-full border border-gray-300 rounded-md p-3"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={() => {
              alert("Comment submitted: " + comment);
              setComment("");
            }}
            className="bg-hotpink text-white py-2 px-6 mt-2 rounded-2xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedBook;
