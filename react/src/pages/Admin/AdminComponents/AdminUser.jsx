import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import Modal from "../../../components/UI/Modal";
import { useAUser } from "./hooks/useAUser";
function AdminUser({ user, setUsers }) {
  const {
    isEditing,
    setIsEditing,
    isModalOpen,
    setIsModalOpen,
    updatedUser,
    setUpdatedUser,
    handleUpdate,
    handleDelete,
  } = useAUser(user, setUsers);

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
