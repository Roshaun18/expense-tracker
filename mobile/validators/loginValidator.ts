import { LoginErrors, LoginForm } from "../types/auth";

export function validateLogin(form: LoginForm): LoginErrors {
  const errors: LoginErrors = {
    email: "",
    password: "",
  };

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
}

export function hasLoginErrors(errors: LoginErrors) {
  return Object.values(errors).some(
    (error) => error !== ""
  );
}