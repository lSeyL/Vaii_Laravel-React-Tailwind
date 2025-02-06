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
  const [searchParams] = useSearchParams();
  const perPage = 6;
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const queryParams = Object.fromEntries(searchParams.entries());
        const response = await api.get(`/shop-items/all`, {
          params: { page: currentPage, per_page: perPage },
        });

        if (response.data.data) {
          setProducts(response.data.data);
          setCurrentPage(response.data.meta?.current_page || 1);
          setLastPage(response.data.meta?.last_page || 1);
        } else {
          console.error("❌ Unexpected response format:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage, searchParams, perPage]);

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Manage Users
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {products.map((product) => (
            <AdminProduct
              key={product.id}
              product={product}
              setProducts={setProducts}
            />
          ))}
        </div>
      )}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default AdminProducts;
