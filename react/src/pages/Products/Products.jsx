import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../../components/UI/Loader";
import ProductItem from "./ProductItem";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";

function Products() {
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

        const response = await api.get(`/shop-items/search`, {
          params: searchQuery
            ? { page: currentPage, name: searchQuery }
            : { page: currentPage },
        });

        //console.log("✅ Server Response:", response.data);
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

  return (
    <div className="flex flex-col items-center my-4 mx-auto max-w-screen-xl px-4">
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
