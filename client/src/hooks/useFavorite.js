import { getUser } from "../API/users";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useFavorite = () => {
  const { token } = useSelector((state) => state.user);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(config),
  });

  // Add to favorites
  const addFavoriteMutation = useMutation({
    mutationFn: async (itemId) => {
      // replace with actual API call to update favorites
      const response = await fetch(`/api/favorites/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (!response.ok) throw new Error("Failed to add favorite");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  });

  // Remove from favorites
  const removeFavoriteMutation = useMutation({
    mutationFn: async (itemId) => {
      const response = await fetch(`/api/favorites/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (!response.ok) throw new Error("Failed to remove favorite");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  });

  const isFavorite = (itemId) => {
    return user?.favorites?.includes(itemId);
  };

  const addFavorite = (itemId) => {
    if (!isFavorite(itemId)) {
      addFavoriteMutation.mutate(itemId);
    }
  };

  const removeFavorite = (itemId) => {
    if (isFavorite(itemId)) {
      removeFavoriteMutation.mutate(itemId);
    }
  };
  console.log('user', user)
  return {
    favorites: user?.favorites || [],
    isLoading,
    isError,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
};

