import { useState, useEffect } from "react";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";
import AdminProduct from "./AdminComponents/AdminProduct";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(9);
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

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

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "name",
        `${newProduct.name}_test ${Math.floor(Math.random() * 1000)}`
      );
      formData.append("description", "This is a test product.");
      formData.append("price", newProduct.price);
      formData.append("category_id", 1); // Replace with a real category ID

      // ✅ Use placeholder file paths
      formData.append("file_path", "shop_items/test_model.obj");
      formData.append("image_file_path", "shop_items/test_image.png");

      formData.append("file_type_ids[0]", 1);
      formData.append("file_type_ids[1]", 2);

      console.log("🛒 Sending Add Product Request:", formData);

      const response = await api.post("/shop-items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      console.log("✅ Product added successfully:", response.data);

      setProducts((prevProducts) => [...prevProducts, response.data.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "❌ Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {isLoading && <p>Loading products...</p>}
      {!isLoading && products.length === 0 && <p>No products found.</p>}
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <AdminProduct
              key={product.id}
              product={product}
              setProducts={setProducts}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
