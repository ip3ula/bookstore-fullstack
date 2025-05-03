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

  const find = state.favorites.some(book => book.id === id);

  return (
    <div className="relative w-30 h-45 min-w-30 lg:w-40 lg:aspect-[2/3] lg:min-h-65 group">
      <img
        src={cover}
        className="w-30 h-45 rounded-md object-cover lg:w-full lg:h-full transition-transform duration-200 group-hover:scale-[1.02]"
        alt="Book cover"
      />

      <svg
        onClick={() => {
          find ? removeMutation.mutate() : addMutation.mutate();
        }}
        className={`size-7 absolute top-2 right-2 rounded p-1 
          ${find ? 'bg-spearmint text-stone-900 fill-stone-900' : 'bg-hotpink text-white'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
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
    </div>
  );
};

export default Book;
