import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../../components/UI/Modal";
import { toast } from "react-toastify";
function AdminProduct({ product, setProducts }) {
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
      toast.error(Object.values(error.response?.data.errors).join(", "));
    }
  };

  return (
    <div className="border p-6 rounded-2xl shadow-lg bg-white w-full max-w-sm box-border flex flex-col items-center text-center">
      <img
        src={product.image_file_path}
        alt={product.name}
        className="w-40 h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
      <p className="text-lg text-gray-700 font-medium mt-1">
        {product.price} €
      </p>
      <p className="text-sm text-gray-600 mt-2">{product.description}</p>

      <div className="mt-4 flex gap-3">
        <button onClick={handleEdit} className="edit-button">
          <HiOutlinePencil className="w-5 h-5" />
          Edit
        </button>
        <button onClick={() => setIsModalOpen(true)} className="delete-button">
          <HiOutlineTrash className="w-5 h-5" />
          Delete
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Product Deletion"
        message={`Are you sure you want to delete "${product.name}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default AdminProduct;
