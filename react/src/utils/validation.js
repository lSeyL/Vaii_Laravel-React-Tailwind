export const validateUserCredentials = (
  email,
  password,
  isSignup = false,
  otherPassword = ""
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  /*
        Check na validnú emailovú adresu
    */
  if (!email || !password) {
    return "Please fill in both email and password fields.";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!symbolRegex.test(password)) {
    return "Password must include at least one special symbol (!@#$%^&* etc.).";
  }

  if (isSignup) {
    if (!otherPassword) {
      return "Please confirm your password.";
    }

    if (password !== otherPassword) {
      return "Passwords do not match.";
    }
  }

  return null;
};
