import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminUser from "./AdminComponents/AdminUser";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error("❌ Unexpected response format:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

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
    </div>
  );
}

export default AdminUsers;
