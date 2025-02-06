import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatDate } from "../../utils/helpers";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 5;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/admin/orders`, {
          params: { page: currentPage, per_page: perPage },
        });
        setOrders(response.data.data);
        setCurrentPage(response.data.meta.current_page);
        setLastPage(response.data.meta.last_page);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentPage]);
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
                Ordered by: {order.user.name} | Date:{" "}
                {formatDate(order.created_at)}
              </p>
              <p>Items: {order.items_count}</p>

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

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {lastPage}
        </span>

        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default AdminOrders;
