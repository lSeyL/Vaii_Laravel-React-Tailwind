import { useState } from "react";
import api from "../../../services/api"; // API instance

function AdminProduct({ product, setProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
  });

  // ✅ Handle product update
  const handleUpdate = async () => {
    try {
      console.log("🔄 Sending Update Request:", updatedProduct);

      const response = await api.put(
        `/shop-items/${product.id}`,
        updatedProduct
      );

      console.log("✅ Update Success:", response.data);

      // ✅ Ensure the updated product replaces the old one in the list
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, ...response.data.data } : p
        )
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "❌ Error updating product:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        console.log(`🛒 Sending DELETE request for product ID: ${product.id}`);

        await api.delete(`/shop-items/${product.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        });

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
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedProduct.name}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            value={updatedProduct.price}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded-md ml-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.price} €</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
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
        </>
      )}
    </div>
  );
}

export default AdminProduct;
