import { useQuery } from '@tanstack/react-query';
import { getBook } from '../API/books';

export const useBook = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
  }
  );
  return {
    data,
    isLoading,
    isError,
  };
};
