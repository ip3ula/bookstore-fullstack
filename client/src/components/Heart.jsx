import { useFavorite } from "../hooks/useFavorite";
import { useSelector } from 'react-redux'

const Heart = ({book}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const user = useSelector(state => state.user)
    return (
<div>
{user && <svg
          onClick={() => {
            isFavorite(book.id)
              ? removeFavorite(book.id)
              : addFavorite(book.id);
          }}
          className={`size-9 absolute top-2 right-2 rounded p-1 bg-hotpink ${
            isFavorite(book.id)
              ? "fill-stone-900 text-stone-900"
              : "text-white"
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
        </svg>}
</div>
    )
}

export default Heart;