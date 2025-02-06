import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

export function useEditProduct() {
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

        const productData =
          location.state?.product ||
          (productId
            ? (await api.get(`/shop-items/${productId}`)).data.data
            : null);

        if (productData) {
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
            productData.additionalImages?.map((img) => img.image_url) || []
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category_id", newProduct.category_id);
      formData.append("_method", "put");

      if (newProduct.image) formData.append("image", newProduct.image);
      if (newProduct.modelFile) formData.append("file", newProduct.modelFile);

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

      if (!newProduct.name) {
        toast.error(`Name required.`);
      }
      if (!newProduct.price) {
        toast.error(`Price required.`);
      }
      if (!newProduct.category_id) {
        toast.error(`Category required.`);
        return;
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
      toast.success(`${newProduct.name} updated!`);
    } catch (error) {
      console.error(
        "❌ Error saving product:",
        error.response?.data || error.message
      );
      toast.error(`${newProduct.name} failed to update!`);
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
    handleSubmit,
  };
}
