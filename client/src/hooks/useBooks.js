import { useQueries } from '@tanstack/react-query';
import { getBooks } from '../API/books';

export const useBooks = (category = 'all') => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['books', category, 'downloads'],
        queryFn: () => getBooks(category, 'downloads'),
      },
      {
        queryKey: ['books', category, 'views'],
        queryFn: () => getBooks(category, 'views'),
      },
    ],
  });

  const [downloads, views] = results;

  return {
    mostDownloads: downloads.data,
    mostPopular: views.data,
    isLoading: downloads.isLoading || views.isLoading,
    isError: downloads.isError || views.isError,
  };
};
