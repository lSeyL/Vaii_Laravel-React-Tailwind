import { Link, Navigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import Loader from "../../components/UI/Loader";
import { useCheckout } from "./hooks/useCheckout";
function Checkout() {
  const { cart, isLoading, handleBuyItems, total, user, token } = useCheckout();

  if (cart.length === 0 || !user || !token) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading && <Loader />}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-10">
        <Link
          to="/cart"
          className="flex items-center text-black hover:text-gray-400 transition duration-300 mb-6"
        >
          <HiArrowLeft className="w-7 h-7 mr-2 ml-3" />
          <span className="text-lg">Back to cart</span>
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Checkout
        </h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="checkout-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full checkout-field "
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="checkout-label">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full checkout-field"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="expiryDate" className="checkout-label">
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                className="w-full checkout-field"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="checkout-label">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                placeholder="123"
                className="w-full checkout-field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="billingAddress" className="checkout-label">
              Billing Address
            </label>
            <input
              id="billingAddress"
              type="text"
              placeholder="Enter your address"
              className="w-full checkout-field"
            />
          </div>

          <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
            <span>Total Amount:</span>
            <span className="text-2xl text-blue-500">€{total.toFixed(2)}</span>
          </div>

          <button className="checkout-payButton" onClick={handleBuyItems}>
            Confirm and Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
