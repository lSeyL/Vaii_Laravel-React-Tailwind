import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/shop-items"
                );
                console.log("API Response:", response.data);
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    return (
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
    );
}

export default Products;
