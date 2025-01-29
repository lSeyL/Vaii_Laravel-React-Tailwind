function CartItem({ item, onDelete }) {
    return (
        <li className="flex justify-between items-center py-2 pt-4">
            <div className="flex items-center">
                <img
                    src={item.image_file_path} // Use the image_file_path from the item object
                    alt={item.name}
                    className="h-24 w-24 bg-gray-200 rounded-md flex-shrink-0 mr-4 object-cover"
                />
                <span>{item.name}</span>
            </div>

            <div className="flex items-center">
                <span className="mr-4">
                    {item.price
                        ? `€${Number(item.price).toFixed(2)}`
                        : "Price not available"}
                </span>
                <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none mr-6"
                    aria-label={`Delete ${item.name}`}
                >
                    &#10005;
                </button>
            </div>
        </li>
    );
}

export default CartItem;
