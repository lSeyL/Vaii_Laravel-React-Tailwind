import { useEffect, useState } from "react";
import api from "../../services/api";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/my-orders");
        const orderData = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setOrders(orderData);
        console.log("api response:", response.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("File is not available.");
      return;
    }
    window.open(fileUrl);
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders?.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order?.id} className="border p-4 rounded-lg shadow-md">
              <p className="font-semibold">{order?.name}</p>
              <p>Category: {order?.category.name}</p>
              <p>Price: {order?.price} €</p>
              <p>
                Purchased on: {new Date(order?.created_at).toLocaleDateString()}
              </p>
              {order?.file_url ? (
                <button
                  onClick={() => handleDownload(order?.file_url, order.name)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Download
                </button>
              ) : (
                <p className="text-red-500">File not available</p>
              )}
              <p>{/* order.file_url */}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders;
