import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AdminAddCategoryForm({ onCategoryCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/categories/create", {
        name: formData.name,
        description: formData.description,
      });
      if (onCategoryCreated) {
        onCategoryCreated();
      }
      setFormData({ name: "", description: "" });
      console.log("✅ Category created successfully");
      navigate("/admin/categories");
      toast.success(`${formData.name} added!`);
    } catch (err) {
      console.error(
        "❌ Error creating category:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the category"
      );
      toast.error(`${formData.name} failed!`);
      toast.error(Object.values(error.response?.data.errors).join(", "));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Category
        </h2>

        {error && (
          <div className="mb-4 text-red-600 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 rounded-md text-white transition ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddCategoryForm;
