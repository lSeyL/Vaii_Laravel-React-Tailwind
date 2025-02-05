import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { useGlobalContext } from "../../providers/globalProvider";
import { useStateContext } from "../../providers/userContext";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductDetails() {
  const { state } = useLocation();
  const { category, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const { token } = useStateContext();
  const {
    cart,
    addToCart,
    removeFromCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useGlobalContext();

  let isInCart = cart.some((item) => item.id === product?.id);
  let isInFavorites = favorites.some((item) => item.id === product?.id);
  const handleAddToCart = () => {
    isInCart = cart.some((item) => item.id === product?.id);
    if (!isInCart) {
      addToCart(product);
      toast.success(`${product.name} added to the cart!`);
    } else if (isInCart) {
      removeFromCart(product.id);
      toast.info(`${product.name} removed from the cart.`);
    }
  };

  const handleToggleFavorite = async () => {
    isInFavorites = favorites.some((item) => item.id === product?.id);
    try {
      if (product.isFavorite) {
        await api.delete(`/favorites/${product.id}`);
        setProduct((prev) => ({ ...prev, isFavorite: false }));
        removeFromFavorites(product.id);
        toast.info(`${product.name} removed from favorites.`);
      } else {
        await api.post(`/favorites/${product.id}`);
        setProduct((prev) => ({ ...prev, isFavorite: true }));
        addToFavorites(product);
        toast.success(`${product.name} added to favorites!`);
      }
    } catch (error) {
      console.error("❌ Error toggling favorite:", error);
    }
  };

  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart(product);
      toast.success(`${product.name} added to the cart!`);
    }

    navigate("/cart");
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/shop-items/${category}/${slug}`);

        const foundProduct = response.data.data;
        console.log("⭐API? :", foundProduct);
        //console.log("⭐IMAGE? :", foundProduct.image_file_path);
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 mx-5 my-2">
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
        {mainImage && (
          <img
            src={mainImage}
            alt={product?.name}
            className="rounded-lg w-full object-cover"
          />
        )}

        <div className="flex gap-4 mt-4">
          {product?.galleryImages?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-16 h-16 rounded-lg cursor-pointer border-2 hover:border-black"
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6 h-[30rem] flex flex-col">
        <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
        <p className="text-sm text-gray-500 mb-2">
          Category: {product?.category?.name}
        </p>
        <p className="text-gray-700 mb-4">{product?.description}</p>
        <p className="text-xl font-semibold text-gray-800 mb-6">
          {product?.price} €
        </p>
        <div>
          <p className="text-md">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            aperiam laboriosam aliquid dolores maxime, est quam debitis
            accusamus, magnam dolorum dolor? Obcaecati dolores expedita ut
            tenetur placeat modi doloremque odit!
          </p>
          {product?.file_types?.map((type) => (
            <span
              key={type.id}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm ml-1"
            >
              {type.type}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-auto mb-5">
          <button
            onClick={() => handleBuyNow()}
            disabled={product?.owned}
            className="bg-stone-800  text-white p-3 rounded-full hover:bg-stone-600 transition duration-300 flex items-center justify-center min-w-[120px]"
          >
            <span>{product?.owned ? "Product owned" : "Buy Now"}</span>
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product?.owned}
            className={`group border ${
              isInCart || product?.owned
                ? "bg-gray-300 border-gray-500 hover:border-gray-500"
                : "bg-stone-800 border-transparent hover:bg-gray-100"
            } text-white p-3 rounded-full hover:border-black transition-all duration-300 flex items-center justify-center`}
          >
            <HiOutlineShoppingBag
              className={`w-6 h-6 text-white transition-colors duration-300 
    group-hover:${product?.owned ? "text-white" : "text-black"}`}
            />
          </button>

          {token && (
            <button
              onClick={handleToggleFavorite}
              className={`group border ${
                product?.isFavorite
                  ? "bg-red-500 border-transparent"
                  : "bg-black border-transparent"
              } text-white p-3 rounded-full hover:bg-white hover:border-black transition-all duration-300 flex items-center justify-center`}
            >
              <HiOutlineHeart
                className={`w-6 h-6 transition-colors duration-300 ${
                  product?.isFavorite
                    ? "text-white group-hover:text-black"
                    : "text-gray group-hover:text-black"
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
