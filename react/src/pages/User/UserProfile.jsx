import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../providers/userContext";
import api from "../../services/api";
function UserProfile() {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      setToken(null);
      navigate("/");
      console.log("User logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          My Profile
        </h2>
        <nav className="space-y-4">
          <Link
            to="my-orders"
            className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition text-center md:text-left"
          >
            My Orders
          </Link>
          <Link
            to="my-favourites"
            className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition text-center md:text-left"
          >
            My Favorites
          </Link>
          <Link
            to="account-settings"
            className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition text-center md:text-left"
          >
            Account Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition text-red-500 text-center md:text-left"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white shadow-lg rounded-lg m-6 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default UserProfile;
