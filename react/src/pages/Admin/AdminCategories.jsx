import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AdminCategory from "./AdminComponents/AdminCategory";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const fetchCategories = async (page) => {
    try {
      const response = await api.get(`/categories?page=${page}`);
      setCategories(response.data.data); // paginated items
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Manage Categories
      </h2>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <AdminCategory
              key={cat.id}
              category={cat}
              setCategories={setCategories}
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

export default AdminCategories;
