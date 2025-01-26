import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const { category, slug } = useParams(); // Extract category and slug from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Category: {product.category.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price} €</p>
            <img src={product.image_file_path} alt={product.name} />
        </div>
    );
}

export default ProductDetails;
