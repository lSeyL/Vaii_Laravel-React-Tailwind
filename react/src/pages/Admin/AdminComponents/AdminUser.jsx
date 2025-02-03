import { useState } from "react";
import api from "../../../services/api"; // API instance

function AdminUser({ user, setUsers }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleUpdate = async () => {
    try {
      const payload = {};

      if (updatedUser.name !== user.name) {
        payload.name = updatedUser.name;
      }

      if (updatedUser.email !== user.email) {
        payload.email = updatedUser.email;
      }

      if (updatedUser.password) {
        payload.new_password = updatedUser.password;
      }

      if (Object.keys(payload).length === 0) {
        setIsEditing(false);
        return;
      }

      console.log("🔄 Sending Update Request:", payload);

      const response = await api.put(`/users/${user.id}`, payload);

      console.log("✅ Update Success:", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? response.data.user : u))
      );
      setIsEditing(false);
    } catch (error) {
      console.error(
        "❌ Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
      try {
        await api.delete(`/users/${user.id}`);
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error("❌ Error deleting user:", error);
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="New password (leave empty to keep current)"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, password: e.target.value })
            }
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded-md ml-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-400">********</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminUser;
