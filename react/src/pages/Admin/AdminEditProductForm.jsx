import { useEditProduct } from "./hooks/useEditProduct";
function AdminEditProductForm() {
  const {
    newProduct,
    setNewProduct,
    categories,
    fileTypes,
    selectedImages,
    handleCheckboxChange,
    handleFileChange,
    handleAdditionalImages,
    handleSubmit,
  } = useEditProduct();

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {newProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 w-full rounded-md"
          />
          <input
            type="number"
            placeholder="Price (€)"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Category</label>
          <select
            value={newProduct.category_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category_id: e.target.value })
            }
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-medium">File Types</label>
          <div className="flex flex-wrap gap-2">
            {fileTypes.map((type) => (
              <label
                key={type.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={newProduct.file_type_ids.includes(type.id)}
                  onChange={() => handleCheckboxChange(type.id)}
                  className="cursor-pointer"
                />
                <span>{type.type}</span>
              </label>
            ))}
          </div>
        </div>
        {selectedImages?.map((image, index) => (
          <div key={index} className="relative w-20 h-20">
            <img
              src={image}
              alt={`preview-${index}`}
              className="w-full h-full object-cover rounded-md border"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          {newProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
}

export default AdminEditProductForm;
