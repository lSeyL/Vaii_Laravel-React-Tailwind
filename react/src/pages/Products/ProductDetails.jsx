import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { useGlobalContext } from "../../providers/globalProvider";
import { useStateContext } from "../../providers/userContext";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDetails from "./hooks/useDetails";
function ProductDetails() {
  const { product, mainImage, setMainImage, error, isLoading, setProduct } =
    useDetails();
  const { token } = useStateContext();
  const {
    cart,
    addToCart,
    removeFromCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useGlobalContext();

  const isInCart = cart.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
      toast.success(`${product.name} added to the cart!`);
    } else if (isInCart) {
      removeFromCart(product.id);
      toast.info(`${product.name} removed from the cart.`);
    }
  };

  const handleToggleFavorite = async () => {
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-1 md:p-6 lg:mb-40  mx-5 my-2">
      <div className="flex-1 bg-white rounded-2xl shadow-lg  p-6 flex flex-col">
        {mainImage && (
          <img
            src={mainImage}
            alt={product?.name}
            className="rounded-lg w-full lg:w-2/3  object-cover"
          />
        )}

        <div className="flex gap-4 mt-5 ">
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

      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
        <p className="text-sm text-gray-500 mb-2">
          Category: {product?.category?.name}
        </p>

        <p className="text-gray-700 mb-4">{product?.description}</p>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          {product?.price} €
        </p>
        <div>
          <p className="md:text-sm lg:text-md font-normal my-4">
            {product?.long_description}
          </p>
          {product?.file_types?.map((type) => (
            <span
              key={type.id}
              className="bg-blue-500 w-10 gap-4 text-white text-xs px-2 py-1 rounded-full shadow-sm ml-1"
            >
              {type.type}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-3 mb-5 flex-wrap">
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
                  : "bg-stone-800 border-transparent"
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
