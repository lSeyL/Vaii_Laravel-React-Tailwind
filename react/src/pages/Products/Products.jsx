import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/UI/Loader";

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
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
        <div className="flex flex-wrap gap-4 justify-evenly my-4 mx-4">
            {isLoading && <Loader />}
            <div>
                <h1>Products Page</h1>
                {products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                {product.name} - {product.price}$
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Products;

{
    /* 
        
        */
}
