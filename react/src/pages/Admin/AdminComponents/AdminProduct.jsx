import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../../components/UI/Modal";
import { useAProduct } from "./hooks/useAProduct";

function AdminProduct({ product, setProducts }) {
  const { isModalOpen, setIsModalOpen, handleEdit, handleDelete } = useAProduct(
    product,
    setProducts
  );

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
