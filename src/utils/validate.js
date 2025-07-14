export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  // More user-friendly password validation: at least 6 characters
  const isPasswordValid = password && password.length >= 6;

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password must be at least 6 characters long";

  return null;
};
