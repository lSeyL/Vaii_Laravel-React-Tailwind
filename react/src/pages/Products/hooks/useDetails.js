import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import { useStateContext } from "../../../providers/userContext";

const useDetails = () => {
  const { category, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const { token } = useStateContext();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/shop-items/${category}/${slug}`);
        const foundProduct = response.data.data;

        if (!foundProduct) {
          throw new Error("Product not found");
        }

        const additionalImages =
          foundProduct.additional_images?.map((img) => img.image_url) || [];

        const galleryImages = [
          foundProduct.image_file_path,
          ...additionalImages,
        ];

        setProduct({ ...foundProduct, galleryImages });
        setMainImage(foundProduct.image_file_path);

        if (token) {
          checkIfUserOwnsItem(foundProduct.id);
          checkIfFavorite(foundProduct.id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [category, slug, token]);

  const checkIfUserOwnsItem = async (productId) => {
    try {
      const response = await api.get(`/owns-item/${productId}`);
      if (response.data.owns) {
        setProduct((prev) => ({ ...prev, owned: true }));
      }
    } catch (error) {
      console.error("❌ Error checking item ownership:", error);
    }
  };

  const checkIfFavorite = async (productId) => {
    try {
      const response = await api.get("/favorites");
      console.log("✅ API Response:", response.data);
      const favorites = response.data.data;
      const isFavorite = favorites.some((fav) => fav.id === productId);
      setProduct((prev) => ({ ...prev, isFavorite }));
    } catch (error) {
      console.error("❌ Error checking favorites:", error);
    }
  };

  return { product, mainImage, setMainImage, error, isLoading, setProduct };
};

export default useDetails;
