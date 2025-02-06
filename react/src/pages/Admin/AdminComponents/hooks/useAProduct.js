import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import { toast } from "react-toastify";

export function useAProduct(product, setProducts) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
  });

  const handleEdit = () => {
    navigate(`/admin/edit/${product.id}`, { state: { product } });
  };

  const handleDelete = async () => {
    try {
      console.log(`🛒 Sending DELETE request for product ID: ${product.id}`);
      await api.delete(`/shop-items/${product.id}`);
      console.log(`✅ Product ID ${product.id} deleted successfully`);

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id)
      );
      setIsModalOpen(false);
      toast.info(`${product.name} deleted!`);
    } catch (error) {
      console.error(
        "❌ Error deleting product:",
        error.response?.data || error.message
      );
      toast.error(`${product.name} failed to delete!`);
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
    updatedProduct,
    setUpdatedProduct,
    handleEdit,
    handleDelete,
  };
}
