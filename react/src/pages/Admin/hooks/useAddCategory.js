import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

export function useAddCategory(onCategoryCreated) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.name) {
        toast.error(`Category requires a name.`);
        return;
      }
      if (!formData.description) {
        toast.info(`No description.`);
      }
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

      if (err.response?.data?.errors) {
        toast.error(Object.values(err.response.data.errors).join(", "));
      }

      toast.error(`${formData.name} failed!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  };
}
