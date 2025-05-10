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
      {
        queryKey: ['books', category, 'rating'],
        queryFn: () => getBooks(category, 'rating.average'),
      },
      {
        queryKey: ['books', category, 'weeklyView'],
        queryFn: () => getBooks(category, 'weeklyView'),
      },
      {
        queryKey: ['books', category, 'addDate'],
        queryFn: () => getBooks(category, 'addDate'),
      },
      {
        queryKey: ['books', category, 'pageCount'],
        queryFn: () => getBooks(category, 'pageCount'),
      },
    ],
  });

  const [downloads, views, rating, weeklyView, addDate, pageCount] = results;

  return {
    mostDownloads: downloads.data || [],
    mostPopular: views.data || [],
    topRated: rating.data || [],
    trending: weeklyView.data || [],
    newReleases: addDate.data || [],
    shortReads: pageCount.data || [],
    isLoading:
      downloads.isLoading ||
      views.isLoading ||
      rating.isLoading ||
      weeklyView.isLoading ||
      addDate.isLoading ||
      pageCount.isLoading,
    isError:
      downloads.isError ||
      views.isError ||
      rating.isError ||
      weeklyView.isError ||
      addDate.isError ||
      pageCount.isError,
    error:
      downloads.error ||
      views.error ||
      rating.error ||
      weeklyView.error ||
      addDate.error ||
      pageCount.error,
    refetch: () => {
      downloads.refetch();
      views.refetch();
      rating.refetch();
      weeklyView.refetch();
      addDate.refetch();
      pageCount.refetch();
  },
  };
};
