import { validateUserCredentials } from "../../../utils/validation";
import api from "../../../services/api";
import { useStateContext } from "../../../providers/userContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export function useSignup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [message, setMessage] = useState(null);
  const { setUser, setToken, token } = useStateContext();
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password_confirmation = passwordConfirmationRef.current.value;

    const error = validateUserCredentials(
      email,
      password,
      true,
      password_confirmation
    );
    if (error) {
      setMessage(error);
      return;
    }

    const payload = { name, email, password, password_confirmation };

    api
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log("User signup error");
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return {
    nameRef,
    emailRef,
    passwordRef,
    passwordConfirmationRef,
    message,
    setMessage,
    onSubmit,
    token,
  };
}
