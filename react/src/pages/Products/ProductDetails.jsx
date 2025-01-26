import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
    const { category, slug } = useParams(); // Get the category and slug from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to generate slug from product name
    const generateSlug = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/shop-items"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                // Filter the product based on category and slug
                const foundProduct = data.data.find(
                    (item) =>
                        item.category.name === category &&
                        generateSlug(item.name) === slug
                );

                if (!foundProduct) {
                    throw new Error("Product not found");
                }

                setProduct(foundProduct);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, [category, slug]); // Dependency array to refetch if category or slug changes

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                style={{ marginBottom: "20px" }}
            >
                &larr; Back
            </button>
            <h1>{product.name}</h1>
            <p>Category: {product.category.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price} €</p>
            <img src={product.image_file_path} alt={product.name} />
        </div>
    );
}

export default ProductDetails;
