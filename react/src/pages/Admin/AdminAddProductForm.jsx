import { useState, useEffect } from "react";
import api from "../../services/api";
import { HiPlus } from "react-icons/hi";

function AdminAddProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    file_type_ids: [],
    image: null,
    modelFile: null,
    additionalImages: [],
  });

  const [categories, setCategories] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryResponse = await api.get("/categories");
        const fileTypeResponse = await api.get("/file-types");

        setCategories(categoryResponse.data.data);
        setFileTypes(fileTypeResponse.data.data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setNewProduct((prev) => ({
      ...prev,
      file_type_ids: prev.file_type_ids.includes(id)
        ? prev.file_type_ids.filter((tid) => tid !== id)
        : [...prev.file_type_ids, id],
    }));
  };

  const handleFileChange = (e, type) => {
    if (type === "image") {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    } else if (type === "model") {
      setNewProduct({ ...newProduct, modelFile: e.target.files[0] });
    }
  };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ...files],
    }));
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category_id", newProduct.category_id);
      formData.append("image", newProduct.image);
      formData.append("file", newProduct.modelFile);

      newProduct.file_type_ids.forEach((id) => {
        formData.append("file_type_ids[]", id);
      });

      newProduct.additionalImages.forEach((file, index) => {
        formData.append(`additional_images[${index}]`, file);
      });

      const response = await api.post("/shop-items", formData);

      console.log("✅ Product added successfully:", response.data);
    } catch (error) {
      console.error(
        "❌ Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>

        {/* Product Name & Price */}
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

        {/* Category Dropdown */}
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

        {/* File Type Checkboxes */}
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
                <span>{type.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            className="border p-2 w-full rounded-md"
          />
        </div>

        {/* Model File Upload */}
        <div className="mt-4">
          <label className="block font-medium">3D Model File</label>
          <input
            type="file"
            accept=".obj,.fbx,.glb,.gltf,.zip"
            onChange={(e) => handleFileChange(e, "model")}
            className="border p-2 w-full rounded-md"
          />
        </div>

        {/* Additional Images */}
        <div className="mt-4">
          <label className="block font-medium">Additional Images</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImages}
              className="border p-2 w-full rounded-md"
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-md"
              onClick={() =>
                document.getElementById("additionalImageInput").click()
              }
            >
              <HiPlus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddProduct}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AdminAddProductForm;
