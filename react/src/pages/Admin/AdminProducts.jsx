import { useState, useEffect } from "react";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";
import AdminProduct from "./AdminComponents/AdminProduct";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(9);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams(searchParams);
        const searchQuery = queryParams.get("name") || "";

        const response = await api.get(`/shop-items/search`, {
          params: searchQuery
            ? { page: currentPage, per_page: perPage, name: searchQuery }
            : { page: currentPage, per_page: perPage },
        });

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
  }, [currentPage, searchParams, perPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {isLoading && <p>Loading products...</p>}
      {!isLoading && products.length === 0 && <p>No products found.</p>}
      {!isLoading && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <AdminProduct
                key={product.id}
                product={product}
                setProducts={setProducts}
              />
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

export default AdminProducts;
