import { getUser, removeFav, addFav } from "../API/users";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useFavorite = () => {
  const userDate = useSelector((state) => state.user);
  if (userDate) {
    var token = userDate.token;
  }
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

  const addFavoriteMutation = useMutation({
    mutationFn:(itemId) => addFav(itemId, config),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  });

  const removeFavoriteMutation = useMutation({
    mutationFn:(itemId) => removeFav(itemId, config),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  });

  const isFavorite = (itemId) => {
    console.log('itemId',itemId)
    return user?.favorites?.find(fav => fav.id === itemId) ? true : false;
  };
  console.log('user?.favorites',user?.favorites)

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

