import { Link } from "react-router-dom";
function ProductItem({ product }) {
    const generateSlug = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
            .replace(/\s+/g, "-") // Replace spaces with dashes
            .trim();

    return (
        <Link
            to={`/products/${product.category.name}/${generateSlug(
                product.name
            )}`}
            className="border rounded-[25px] shadow-lg h-96 w-96 relative overflow-hidden group"
        >
            {/* Product Image */}
            <img
                src={product.image_file_path}
                alt={product.name}
                className="h-full w-full object-cover group-hover:blur-sm transition duration-300 ease-in-out"
            />

            {/* Supported Types in the top left corner */}
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {product.file_types.map((type) => (
                    <span
                        key={type.id}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm ml-1"
                    >
                        {type.type}
                    </span>
                ))}
            </div>

            {/* Overlay for name, description, and price */}
            <div className="absolute bottom-0 left-0 w-full bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-2xl font-bold">{product.price} €</p>
                </div>
                <p className="text-gray-600 mt-1">{product.description}</p>
            </div>
        </Link>
    );
}

export default ProductItem;
