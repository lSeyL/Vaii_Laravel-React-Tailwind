import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../../components/UI/Loader";
import ProductItem from "./ProductItem";
import api from "../../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams(searchParams);
        const searchQuery = queryParams.get("name") || "";
        const category = queryParams.get("category") || "";

        console.log("🔍 Fetching with params:", {
          name: searchQuery,
          category,
        });

        const response = await api.get(`/shop-items/search`, {
          params: { page: currentPage, name: searchQuery, category },
        });

        console.log("✅ Server Response:", response.data);
        setProducts(response.data.data);
        setCurrentPage(response.data.meta.current_page);
        setLastPage(response.data.meta.last_page);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage, searchParams]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
        console.log("✅ Categorieess:", response.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <div className="mt-32flex flex-col items-center my-4 mx-auto max-w-screen-xl px-4">
      <CategoryFilter />

      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full lg:mt-10 lg:mb-10">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft className="text-xl" />
            </button>

            <span className="text-lg font-semibold">
              Page {currentPage} of {lastPage}
            </span>

            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, lastPage))
              }
              disabled={currentPage === lastPage}
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
