import { useEffect, useState } from "react";
import api from "../../../services/api";

const useFavorites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorites");
        setFavourites(response.data.data);
      } catch (err) {
        console.error("❌ Error fetching favorites:", err);
        setError("Failed to fetch favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { favourites, loading, error };
};

export default useFavorites;
