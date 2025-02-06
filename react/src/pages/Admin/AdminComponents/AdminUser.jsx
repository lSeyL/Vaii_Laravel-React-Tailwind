import { useState } from "react";
import api from "../../../services/api";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import Modal from "../../../components/UI/Modal";
import { toast } from "react-toastify";
function AdminUser({ user, setUsers }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

      const response = await api.post(`/users/${user.id}`, payload);

      console.log("✅ Update Success:", response.data);
      console.log("✅ User id:", user.id);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? response.data.user : u))
      );
      setIsEditing(false);
      toast.succes(`${user.name} updated!`);
    } catch (error) {
      console.error(
        "❌ Error updating user:",
        error.response?.data || error.message
      );
      toast.error(`${user.name} failed to update!`);
      toast.error(Object.values(error.response?.data.errors).join(", "));
    }
  };

  const handleDelete = async () => {
    if (user.role === "admin") {
      setIsModalOpen(false);
      toast.error(`Cannot delete an admin!`);
      return;
    }
    try {
      await api.delete(`/users/${user.id}`);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast.success(`${user.name} deleted!`);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      toast.error(`${user.name} failed to delete!`);
      toast.error(Object.values(error.response?.data.errors).join(", "));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center border border-gray-200">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            placeholder="Name"
          />
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="New password (leave empty to keep current)"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, password: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              <HiCheck className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              <HiOutlineXMark className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-400">********</p>
          <div className="flex space-x-2 mt-4">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              <HiOutlinePencil className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="delete-button"
            >
              <HiOutlineTrash className="w-5 h-5" />
              Delete
            </button>
          </div>
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        message={`Are you sure you want to delete "${user.name}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default AdminUser;
