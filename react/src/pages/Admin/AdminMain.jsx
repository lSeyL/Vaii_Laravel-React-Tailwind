import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminMain = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition ${
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
              `px-4 py-2 rounded-md transition ${
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
              `px-4 py-2 rounded-md transition ${
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
              `px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Products
          </NavLink>
        </nav>
        <button
          onClick={() => navigate("/")}
          className="mt-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full h-full bg-white p-6 rounded-2xl shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
