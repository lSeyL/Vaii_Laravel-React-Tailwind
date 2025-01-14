import { useState } from "react";

function Cart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Product A", price: 29.99 },
        { id: 2, name: "Product B", price: 49.99 },
        { id: 3, name: "Product C", price: 19.99 },
    ]);

    // Handler to delete an item from the cart
    const handleDelete = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Calculate total price
    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.price, 0)
        .toFixed(2);
    const tax = (totalPrice * 0.1).toFixed(2); // Assuming 10% tax
    const finalTotal = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-center p-2 sm:p-10 md:p-24 gap-4 sm:gap-16">
            {/* Left Card - Larger */}
            <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-2/3  h-[40rem]">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                <div className="flex justify-between font-bold pb-2">
                    <span>Product</span>
                    <span>Price</span>
                </div>
                <ul className="space-y-4 divide-y">
                    {cartItems.length === 0 ? (
                        <li className="text-center text-gray-500">
                            Your cart is empty.
                        </li>
                    ) : (
                        cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center py-2 pt-4"
                            >
                                <div className="flex items-center">
                                    <div className="ml-10 h-24 w-24 bg-gray-200 rounded-md flex-shrink-0 mr-4">
                                        {/* Placeholder for product image */}
                                    </div>
                                    <span>{item.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-4">
                                        ${item.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 focus:outline-none mr-6"
                                        aria-label={`Delete ${item.name}`}
                                    >
                                        &#10005;
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Right Card - Smaller and Shorter */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3 h-96 ">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>$99.97</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Tax (10%)</span>
                    <span>$9.99</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>$109.96</span>
                </div>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;
