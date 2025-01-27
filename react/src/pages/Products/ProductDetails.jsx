import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";

function ProductDetails() {
    const { category, slug } = useParams(); // Get the category and slug from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(null);

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

                // Safely create galleryImages with placeholders
                const galleryImages = [
                    foundProduct.image_file_path,
                    "https://via.placeholder.com/150?text=Placeholder+1",
                    "https://via.placeholder.com/150?text=Placeholder+2",
                    "https://via.placeholder.com/150?text=Placeholder+3",
                    ...(foundProduct.galleryImages || []),
                ];

                // Set the product and default main image
                setProduct({ ...foundProduct, galleryImages });
                setMainImage(foundProduct.image_file_path); // Default to the main image
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
        <div className="flex flex-col md:flex-row gap-6 p-6 mx-5 my-2">
            {/* Big Card (Left) */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
                {/* Main Image */}
                {mainImage && (
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="rounded-lg w-full object-cover"
                    />
                )}
                {/* Small Image Thumbnails */}
                <div className="flex gap-4 mt-4">
                    {product.galleryImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-16 h-16 rounded-lg cursor-pointer border-2 hover:border-black"
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>
            </div>

            {/* Small Card (Right) */}
            <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6 h-[30rem] flex flex-col">
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-2">
                    Category: {product.category.name}
                </p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-semibold text-gray-800 mb-6">
                    {product.price} €
                </p>
                <div>
                    <p className="text-md">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ipsum aperiam laboriosam aliquid dolores maxime,
                        est quam debitis accusamus, magnam dolorum dolor?
                        Obcaecati dolores expedita ut tenetur placeat modi
                        doloremque odit!
                    </p>
                </div>
                <div className="flex justify-center gap-4 mt-auto mb-5">
                    {/* Buy Now Button */}
                    <button
                        onClick={() => console.log("Buy Now")}
                        className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition flex items-center justify-center min-w-[120px]"
                    >
                        <span>Buy Now</span>
                    </button>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => console.log("Add to Cart")}
                        className="border border-black bg-black p-3 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                    >
                        <HiOutlineShoppingBag
                            className="w-6 h-6"
                            color="white"
                        />
                    </button>

                    {/* Add to Favourites Button */}
                    <button
                        onClick={() => console.log("Add to Favourites")}
                        className="border border-black bg-black p-3 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                    >
                        <HiOutlineHeart className="w-6 h-6" color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
