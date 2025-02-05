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
  const perPage = 5;
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
    <div className="p-2 sm:p-3 md:p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {products?.length === 0 ? (
        <p>You have no products yet.</p>
      ) : (
        <div className="space-y-4 flex flex-col items-center text-left w-full">
          <div className="flex flex-col gap-4 w-full lg:w-2/3">
            {products.map((product) => (
              <AdminProduct
                key={product.id}
                product={product}
                setProducts={setProducts}
              />
            ))}
          </div>
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
