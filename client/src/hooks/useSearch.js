import { searchBooks } from "../API/books";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (query) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchBooks(query),
    refetchOnWindowFocus: false,
    enabled: !!query,
  });

  const errorMessage = isError ? error?.message || "An error occurred during the search." : null;

  return { data, isLoading, errorMessage };
};
