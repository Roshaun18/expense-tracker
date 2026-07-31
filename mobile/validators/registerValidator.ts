import { RegisterErrors, RegisterForm } from "../types/auth";

export function validateStep1(form: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  return errors;
}

export function validateStep2(form: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 8) {
    errors.password = "Minimum 8 characters";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function hasErrors(errors: RegisterErrors) {
  return Object.values(errors).some(
    (error) => error !== ""
  );
}