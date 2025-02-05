import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { HiPlus } from "react-icons/hi";

function AdminEditProductForm() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await api.get("/categories");
        const fileTypeResponse = await api.get("/file-types");

        setCategories(categoryResponse.data.data);
        setFileTypes(fileTypeResponse.data.data);

        if (productId && !location.state?.product) {
          const productResponse = await api.get(`/shop-items/${productId}`);
          const productData = productResponse.data.data;
          setNewProduct({
            name: productData.name || "",
            price: productData.price || "",
            category_id: productData.category_id || "",
            file_type_ids: productData.file_type_ids || [],
            image: null,
            modelFile: null,
            additionalImages: productData.additionalImages || [],
          });
          setSelectedImages(
            productData.additionalImages.map((img) => img.image_url)
          );
        } else if (location.state?.product) {
          setNewProduct({
            name: location.state.product.name || "",
            price: location.state.product.price || "",
            category_id: location.state.product.category_id || "",
            file_type_ids: location.state.product.file_type_ids || [],
            image: null,
            modelFile: null,
            additionalImages: location.state.product.additionalImages || [],
          });
          setSelectedImages(
            location?.state?.product?.additionalImages?.map(
              (img) => img.image_url
            )
          );
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId, location.state]);

  const handleCheckboxChange = (id) => {
    setNewProduct((prev) => ({
      ...prev,
      file_type_ids: prev.file_type_ids.includes(id)
        ? prev.file_type_ids.filter((tid) => tid !== id)
        : [...prev.file_type_ids, id],
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") {
      setNewProduct((prev) => ({ ...prev, image: file }));
    } else if (type === "model") {
      setNewProduct((prev) => ({ ...prev, modelFile: file }));
    }
  };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ...files],
    }));

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...previewUrls]);
  };

  const handleAddImageClick = () => {
    document.getElementById("additionalImageInput").click();
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category_id", newProduct.category_id);
      if (newProduct.image) formData.append("image", newProduct.image);
      if (newProduct.modelFile) formData.append("file", newProduct.modelFile);
      const entries = Object.fromEntries(formData.entries());
      console.log("data", entries);

      newProduct.file_type_ids.forEach((id) => {
        formData.append("file_type_ids[]", id);
      });

      newProduct.additionalImages.forEach((file) => {
        formData.append("additional_images[]", file);
      });

      console.log("📤 Sending FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      if (productId) {
        await api.post(`/shop-items/${productId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("✅ Product updated successfully");
      } else {
        await api.post("/shop-items", formData);
        console.log("✅ Product created successfully");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "❌ Error saving product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {productId ? "Edit Product" : "Add New Product"}
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
          {productId ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
}

export default AdminEditProductForm;
