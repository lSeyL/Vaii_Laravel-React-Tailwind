import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../providers/globalProvider";
import { useStateContext } from "../../../providers/userContext";
import api from "../../../services/api";

export function useCheckout() {
  const { cart, clearCart } = useGlobalContext();
  const { token, user } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyItems = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);

    try {
      console.log("🛒 Sending purchase request:", cart);
      const response = await api.post("/purchase", { cart });
      console.log("✅ Purchase Successful:", response.data);
      clearCart();
      setIsLoading(false);

      if (!token) {
        navigate("/", { replace: true });
      } else {
        navigate("/profile/my-orders");
      }
    } catch (error) {
      console.error(
        "❌ Purchase Failed:",
        error.response?.data || error.message
      );
      setIsLoading(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return {
    cart,
    isLoading,
    handleBuyItems,
    subtotal,
    tax,
    total,
    user,
    token,
  };
}
