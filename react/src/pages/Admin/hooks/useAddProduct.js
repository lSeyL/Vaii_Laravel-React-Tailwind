import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

export function useAddProduct() {
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
    const file = e.target.files[0];
    if (type === "image") {
      setNewProduct((prev) => ({ ...prev, image: file }));
    } else if (type === "model") {
      setNewProduct((prev) => ({ ...prev, modelFile: file }));
    }
  };

  const handleAdditionalImages = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setNewProduct((prevState) => ({
        ...prevState,
        additionalImages: [...prevState.additionalImages, ...files],
      }));
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...previewUrls]);
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("category_id", newProduct.category_id);
      if (newProduct.image) formData.append("image", newProduct.image);
      if (newProduct.modelFile) formData.append("file", newProduct.modelFile);

      newProduct.file_type_ids.forEach((id) => {
        formData.append("file_type_ids[]", id);
      });

      newProduct.additionalImages.forEach((file) => {
        formData.append("additional_images[]", file);
      });

      const response = await api.post("/shop-items", formData);
      console.log("✅ Product added successfully:", response.data);
      navigate("/admin/products");
      toast.success(`${newProduct.name} added!`);
    } catch (error) {
      console.error(
        "❌ Error adding product:",
        error.response?.data || error.message
      );
      toast.error(`${newProduct.name} failed to add!`);
      toast.error(Object.values(error.response.data.errors).join(", "));
      if (error.response?.data?.errors) {
        toast.error(Object.values(error.response.data.errors).join(", "));
      }
    }
  };

  return {
    newProduct,
    setNewProduct,
    categories,
    fileTypes,
    selectedImages,
    handleCheckboxChange,
    handleFileChange,
    handleAdditionalImages,
    handleAddProduct,
  };
}
