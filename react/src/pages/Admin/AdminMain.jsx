import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { HiMiniBars4 } from "react-icons/hi2";
function AdminMain() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg p-4 flex flex-col transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center flex-1">
            Admin Panel
          </h2>
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(false)}
          >
            <HiXMark size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Add product
          </NavLink>
        </nav>

        <button
          onClick={() => navigate("/")}
          className="mt-auto bg-stone-800 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Home
        </button>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <button
          className="md:hidden bg-blue-500 text-white px-3 py-3 rounded-full self-start mb-4"
          onClick={() => setSidebarOpen(true)}
        >
          <HiMiniBars4 size={24} />
        </button>

        <div className="w-full h-full bg-white p-6 rounded-2xl shadow-lg flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
