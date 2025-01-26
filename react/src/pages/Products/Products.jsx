import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/UI/Loader";
import ProductItem from "./ProductItem";

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 10));
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/shop-items"
                );
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
            <h1 className="text-4xl mb-4">Products Page</h1>
            {isLoading ? (
                <Loader />
            ) : products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
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
