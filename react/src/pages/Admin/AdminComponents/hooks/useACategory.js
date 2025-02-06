import { useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";

export function useACategory(category, setCategories) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({
    name: category.name,
    description: category.description || "",
  });

  const handleUpdate = async () => {
    try {
      if (!updatedCategory.name) {
        toast.error(`Name required!`);
        return;
      }
      if (!updatedCategory.description) {
        toast.info(`No description.`);
      }

      await api.put(`/categories/update/${category.id}`, {
        name: updatedCategory.name,
        description: updatedCategory.description,
      });

      console.log("✅ Category updated successfully");

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === category.id
            ? {
                ...cat,
                name: updatedCategory.name,
                description: updatedCategory.description,
              }
            : cat
        )
      );

      setIsEditing(false);
      toast.success(`${updatedCategory.name} updated!`);
    } catch (error) {
      console.error(
        "❌ Error updating category:",
        error.response?.data || error.message
      );
      toast.error(`${updatedCategory.name} failed to update!`);
      if (error.response?.data?.errors) {
        toast.error(Object.values(error.response.data.errors).join(", "));
      }
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/delete/${category.id}`);

      console.log("✅ Category deleted successfully");

      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
      toast.success(`${updatedCategory.name} deleted!`);
    } catch (error) {
      console.error(
        "❌ Error deleting category:",
        error.response?.data || error.message
      );
      toast.error(`${updatedCategory.name} failed to delete!`);
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
    updatedCategory,
    setUpdatedCategory,
    handleUpdate,
    handleDelete,
  };
}
