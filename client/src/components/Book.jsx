import { useContext } from "react";
import UserDataContext from '../userDataContext';
import UserContext from '../UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userServices from '../services/users';

const Book = ({ cover, id }) => {
  const [user] = useContext(UserContext);
  const [state] = useContext(UserDataContext);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: () =>
      userServices.addFav(id, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    onError: (error) => {
      console.error('Error adding to favorites:', error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: () =>
      userServices.removeFav(id, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    onError: (error) => {
      console.error('Error removing from favorites:', error);
    },
  });

  if (!state) return null;

  const isFavorite = state.favorites.some((book) => book.id === id);

  return (
    <div
      className="relative rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.025] shadow group w-full aspect-[2/3] bg-white"
    >
      <img
        src={cover}
        alt="Book cover"
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Favorite Button */}
      <button
        onClick={() =>
          isFavorite ? removeMutation.mutate() : addMutation.mutate()
        }
        className={`absolute top-2 right-2 size-8 rounded-full p-1 transition-colors 
          ${isFavorite
            ? 'bg-spearmint text-stone-900 fill-stone-900'
            : 'bg-hotpink text-white hover:bg-rose-500'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
               -1.935 0-3.597 1.126-4.312 2.733
               -.715-1.607-2.377-2.733-4.313-2.733
               C5.1 3.75 3 5.765 3 8.25
               c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Book;
