import { useEffect, useState } from "react";
import api from "../../../services/api";

const useOrders = () => {
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

  return { orders, loading, error };
};

export default useOrders;
