import { useEffect, useState } from "react";
import api from "../../services/api"; // API instance
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
          setUsers(response.data.data); // ✅ Handle paginated response
        } else {
          console.error("❌ Unexpected response format:", response.data);
          setUsers([]); // Prevent crash
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <AdminUser key={user.id} user={user} setUsers={setUsers} />
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
