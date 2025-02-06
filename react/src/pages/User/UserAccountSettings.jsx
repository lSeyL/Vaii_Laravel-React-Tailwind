import { useState } from "react";
import { useStateContext } from "../../providers/userContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal";

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
      console.log(formData);

      if (user.role === "admin") {
        setMessage({ type: "error", text: "Cannot update an admin." });
        return;
      }
      const nameChanged = formData.name && formData.name !== user.name;
      const emailChanged = formData.email && formData.email !== user.email;
      const passwordChanged = formData.oldPassword && formData.newPassword;

      if (!nameChanged && !emailChanged && !passwordChanged) {
        setMessage({ type: "error", text: "No changes were made." });
        return;
      }
      if (!formData.name) {
        setMessage({ type: "error", text: "User needs a name." });
        return;
      }
      if (!formData.email) {
        setMessage({ type: "error", text: "User needs an email." });
        return;
      }
      if (passwordChanged) {
        if (!formData.oldPassword) {
          setMessage({
            type: "error",
            text: "Old password is required to change password.",
          });
          return;
        }
        if (!formData.newPassword) {
          setMessage({ type: "error", text: "New password cannot be empty." });
          return;
        }
      }

      const response = await api.post("/profile-update", {
        name: nameChanged ? formData.name : undefined,
        email: emailChanged ? formData.email : undefined,
        old_password: passwordChanged ? formData.oldPassword : undefined,
        new_password: passwordChanged ? formData.newPassword : undefined,
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
      if (user.role === "admin") {
        setMessage({ type: "error", text: "Cannot delete an admin." });
        return;
      }
      await api.delete("/delete-account");
      console.log("user name " + user?.name);
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
          className={`p-3 border-2 rounded-md mb-5 ${
            message.type === "success"
              ? "bg-lime-100 border-lime-600 text-lime-600"
              : "bg-red-200 border-red-600 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block pl-3 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block pl-3 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg pl-3 mb-2 font-semibold text-gray-600">
            Change Password
          </h3>

          <div>
            <label className="block pl-3 text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block pl-3 text-sm mt-5 font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition"
          >
            Delete Account
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {isModalOpen && (
        <>
          <Modal
            isOpen={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={confirmDelete}
            title="Confirm Account Deletion"
            message="Are you sure you want to delete your account?"
            confirmText="Yes, Delete"
            cancelText="Cancel"
          />
        </>
      )}
    </div>
  );
}

export default UserAccountSettings;
