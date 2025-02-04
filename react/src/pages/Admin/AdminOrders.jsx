import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/admin/orders");
        setOrders(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-md">
              <p className="font-semibold">
                Ordered by: {order.user.name} | Date: {order.created_at}
              </p>
              <p>Items: {order.items_count}</p>

              {/* ✅ Dropdown for showing items */}
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">
                  View Items
                </summary>
                <ul className="mt-2 space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="border p-2 rounded-md">
                      {item.name} - {item.price} €
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
