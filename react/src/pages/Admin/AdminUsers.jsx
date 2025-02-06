import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminUser from "./AdminComponents/AdminUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaginationControls from "./../../components/UI/PaginationControls";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users", {
          params: { page: currentPage, per_page: perPage },
        });

        console.log(response.data);

        if (response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          setCurrentPage(response.data.meta.current_page);
          setLastPage(response.data.meta.last_page);
        } else {
          console.error("❌ Unexpected response format:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <AdminUser key={user.id} user={user} setUsers={setUsers} />
          ))}
        </div>
      )}
      <PaginationControls
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default AdminUsers;
