import { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader";
import ProductItem from "./ProductItem";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 10));
        const response = await api.get("shop-items");
        console.log("API Response:", response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center my-4 mx-auto max-w-screen-xl px-4">
      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full lg:mt-10 lg:mb-10">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

{
  /* 
        
        */
}
