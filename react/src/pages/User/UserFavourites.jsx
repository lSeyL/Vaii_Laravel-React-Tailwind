import { useEffect, useState } from "react";
import api from "../../services/api";

function UserFavourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/favorites");
        setFavourites(response.data.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(favourites);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {favourites.length === 0 ? (
        <p>You have no favorite items yet.</p>
      ) : (
        <div className="space-y-4">
          {favourites.map((fav) => (
            <div key={fav.id} className="border p-4 rounded-lg shadow-md">
              <p className="font-semibold">{fav.name}</p>
              <p>Category: {fav.category.name}</p>
              <p>Price: {fav.price} €</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFavourites;
