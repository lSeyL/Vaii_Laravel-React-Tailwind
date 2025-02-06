import { useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { validateUserCredentials } from "../../../../utils/validation";

export function useAUser(user, setUsers) {
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
      let isPasswordChanged = false;
      let isEmailChanged = false;
      if (updatedUser.name !== user.name) {
        payload.name = updatedUser.name;
      }

      if (updatedUser.email !== user.email) {
        payload.email = updatedUser.email;
      }

      if (updatedUser.password) {
        payload.new_password = updatedUser.password;
        isPasswordChanged = true;
      }

      if (Object.keys(payload).length === 0) {
        setIsEditing(false);
        return;
      }
      if (!updatedUser.name) {
        toast.error(`User needs a name!`);
      }
      if (!updatedUser.email) {
        toast.error(`User needs an email!`);
      }
      if (isPasswordChanged) {
        if (!updatedUser.password) {
          toast.error(`Password cant be null!`);
          return;
        }
      }
      if (isEmailChanged) {
        if (!updatedUser.email) {
          toast.error(`Email cant be null!`);
          return;
        }
      }

      console.log("🔄 Sending Update Request:", payload);
      const response = await api.post(`/users/${user.id}`, payload);
      console.log("✅ Update Success:", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? response.data.user : u))
      );
      setIsEditing(false);
      toast.success(`${user.name} updated!`);
    } catch (error) {
      console.error(
        "❌ Error updating user:",
        error.response?.data || error.message
      );
      toast.error(`${user.name} failed to update!`);
      if (error.response?.data?.errors) {
        toast.error(Object.values(error.response.data.errors).join(", "));
      }
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
      if (error.response?.data?.errors) {
        toast.error(Object.values(error.response.data.errors).join(", "));
      }
    }
  };

  return {
    isEditing,
    setIsEditing,
    isModalOpen,
    setIsModalOpen,
    updatedUser,
    setUpdatedUser,
    handleUpdate,
    handleDelete,
  };
}
