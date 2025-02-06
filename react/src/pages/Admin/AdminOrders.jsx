import { useEffect, useState } from "react";
import api from "../../services/api";
import PaginationControls from "./../../components/UI/PaginationControls";
import AdminOrder from "./AdminComponents/AdminOrder";
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
          orders.map((order) => <AdminOrder order={order} />)
        )}
      </div>

      <PaginationControls
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default AdminOrders;
