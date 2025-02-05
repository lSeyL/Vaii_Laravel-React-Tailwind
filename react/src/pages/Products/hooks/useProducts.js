import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchParams] = useSearchParams();

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

  return { products, isLoading, currentPage, lastPage, setCurrentPage };
};

export default useProducts;
