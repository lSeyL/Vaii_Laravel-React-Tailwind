import { useState, useEffect } from "react";
import api from "../../services/api";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AdminAddProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    file_type_ids: [],
    image: null,
    modelFile: null,
    additionalImages: [],
  });
  const [categories, setCategories] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const handleAdditionalImages = (event) => {
    const files = Array.from(event.target.files);
    //console.log("📸 Selected Files:", files);
    if (files.length > 0) {
      setNewProduct((prevState) => ({
        ...prevState,
        additionalImages: [...(prevState.additionalImages || []), ...files],
      }));
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...previewUrls]);
    }
  };
  const handleAddImageClick = () => {
    document.getElementById("additionalImageInput").click();
  };

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

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("category_id", newProduct.category_id);
      formData.append("image", newProduct.image);
      formData.append("file", newProduct.modelFile);

      newProduct.file_type_ids.forEach((id) => {
        formData.append("file_type_ids[]", id);
      });

      if (
        !newProduct.additionalImages ||
        newProduct.additionalImages.length === 0
      ) {
        console.error("🚨 No additional images selected!");
      }

      newProduct.additionalImages.forEach((file) => {
        formData.append("additional_images[]", file);
        console.log("☑️Additional file: ", file);
      });

      //console.log("☑️ Images:", newProduct.additionalImages);
      const response = await api.post("/shop-items", formData);
      //console.log("✅ Product added successfully:", response.data);
      navigate("/admin/products");
      toast.success(`${newProduct.name} added!`);
    } catch (error) {
      console.error(
        "❌ Error adding product:",
        error.response?.data || error.message
      );
      toast.error(`${newProduct.name} failed to add!`);
      toast.error(Object.values(error.response?.data.errors).join(", "));
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>

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
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 w-full rounded-md mt-5"
        />

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

        <div className="mt-4">
          <label className="block font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">3D Model File</label>
          <input
            type="file"
            accept=".obj,.fbx,.glb,.gltf,.zip"
            onChange={(e) => handleFileChange(e, "model")}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Additional Images</label>
          <div className="flex items-center space-x-4">
            <input
              id="additionalImageInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImages}
              className="hidden"
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-md"
              onClick={handleAddImageClick}
            >
              <HiPlus className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={image}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AdminAddProductForm;
