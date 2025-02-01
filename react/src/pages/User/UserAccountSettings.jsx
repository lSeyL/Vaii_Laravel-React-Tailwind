import { useState } from "react";
import { useStateContext } from "../../providers/userContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function UserAccountSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.put("/profile-update", {
        name: formData.name,
        email: formData.email,
        old_password: formData.oldPassword || null,
        new_password: formData.newPassword || null,
      });

      setUser(response.data.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Error updating profile." });
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete("/delete-account");
      setUser(null);
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("Delete Error:", error);
      setMessage({ type: "error", text: "Failed to delete account." });
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Account Settings
      </h2>

      {message && (
        <div
          className={`p-3 rounded-md text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        {/* Password Change Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-600">
            Change Password
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
        </div>

        {/* Save & Delete Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)} // 🔹 Open modal on click
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* 🔹 Modal (Placed Outside the Form) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold">Confirm Account Deletion</h2>
            <p className="mt-2">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccountSettings;
