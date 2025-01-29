import React from "react";

function Checkout() {
    const totalAmount = 199.99; // Replace with dynamic value if needed

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Main Card */}
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                    Checkout
                </h1>
                <form className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name on Card
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                        />
                    </div>

                    {/* Card Number Input */}
                    <div>
                        <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Card Number
                        </label>
                        <input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                        />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label
                                htmlFor="expiryDate"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Expiry Date
                            </label>
                            <input
                                id="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="cvv"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CVV
                            </label>
                            <input
                                id="cvv"
                                type="text"
                                placeholder="123"
                                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                            />
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                        <label
                            htmlFor="billingAddress"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Billing Address
                        </label>
                        <input
                            id="billingAddress"
                            type="text"
                            placeholder="Enter your address"
                            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                        />
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
                        <span>Total Amount:</span>
                        <span className="text-2xl text-blue-600">
                            €{totalAmount.toFixed(2)}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
                    >
                        Confirm and Pay
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
