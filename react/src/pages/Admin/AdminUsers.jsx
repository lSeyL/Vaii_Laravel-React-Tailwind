import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminUser from "./AdminComponents/AdminUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  }, [currentPage]); // Refetch users when the page changes

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

export default AdminUsers;
