import React from "react";
import { useGlobalContext } from "../../providers/globalProvider";
import { FaTrash } from "react-icons/fa";
import CartItem from "./CartItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cart, removeFromCart } = useGlobalContext();

    const handleRemove = (itemId) => {
        const item = cart.find((i) => i.id === itemId);
        removeFromCart(itemId);
        toast.info(`${item.name} removed from the cart!`, {
            icon: <FaTrash className="text-black" />,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate("/checkout");
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-600">
                        Add items to your cart to see them here!
                    </p>
                </div>
            </div>
        );
    }

    const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-center p-2 sm:p-10 md:p-24 gap-4 sm:gap-16">
            {/* Shopping Cart Section */}
            <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-2/3">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                <div className="flex justify-between font-bold pb-2">
                    <span>Product</span>
                    <span>Price</span>
                </div>
                <ul className="space-y-4 divide-y">
                    {cart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onDelete={handleRemove}
                        />
                    ))}
                </ul>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full h-[18rem] lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Tax (10%)</span>
                    <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                </div>

                <button
                    className=" mt-4 w-full border-2 border-stone-800 text-stone-800 hover:bg-stone-600 hover:text-white py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;
