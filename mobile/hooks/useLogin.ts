import { useState } from "react";
import { router } from "expo-router";
import { LoginErrors, LoginForm } from "../types/auth";
import authService from "../services/authService";
import {
  validateLogin,
  hasLoginErrors,
} from "../validators/loginValidator";

export default function useLogin() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = <K extends keyof LoginForm>(
    field: K,
    value: LoginForm[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const login = async () => {
    const validation = validateLogin(form);

    if (hasLoginErrors(validation)) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(form);

      console.log("Login successful:",response);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:",error);
      if (error instanceof Error) {
    setErrors({
      email: error.message,
      password: "",
    });
  } else {
    setErrors({
      email: "Invalid email or password",
      password: "",
    });
  }

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    updateField,
    login,
  };
}