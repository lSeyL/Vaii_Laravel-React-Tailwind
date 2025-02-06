import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AdminCategory from "./AdminComponents/AdminCategory";
import PaginationControls from "./../../components/UI/PaginationControls";
import { toast } from "react-toastify";
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
      setCategories(response.data.data);
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
    } catch (error) {
      toast.error(Object.values(error.response?.data.errors).join(", "));
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

      <PaginationControls
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default AdminCategories;
