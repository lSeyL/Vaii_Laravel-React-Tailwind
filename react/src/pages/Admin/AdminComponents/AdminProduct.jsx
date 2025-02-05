import { useState } from "react";
import api from "../../../services/api"; // API instance
import { useNavigate } from "react-router-dom";

function AdminProduct({ product, setProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
  });

  const handleEdit = () => {
    navigate(`/admin/edit/${product.id}`, { state: { product } });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        console.log(`🛒 Sending DELETE request for product ID: ${product.id}`);
        await api.delete(`/shop-items/${product.id}`);
        console.log(`✅ Product ID ${product.id} deleted successfully`);
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
      } catch (error) {
        console.error(
          "❌ Error deleting product:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.price} €</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={handleEdit}
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
    </div>
  );
}

export default AdminProduct;
