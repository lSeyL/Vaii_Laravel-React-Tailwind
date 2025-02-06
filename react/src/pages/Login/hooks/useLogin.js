import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useStateContext } from "../../../providers/userContext";
import { validateUserCredentials } from "../../../utils/validation";

export function useLogin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { setUser, setToken, token } = useStateContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = () => {
    if (message) {
      setMessage(null);
    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const error = validateUserCredentials(email, password);
    if (error) {
      setMessage(error);
      return;
    }

    api
      .post("/login", { email, password })
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate("/");
        console.log("User logged in.");
      })
      .catch((err) => {
        console.log("User login error");
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return {
    emailRef,
    passwordRef,
    message,
    handleInputChange,
    onSubmit,
    token,
  };
}
