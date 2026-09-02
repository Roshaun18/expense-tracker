import { useState } from "react";
import { router } from "expo-router";

import authService from "../services/authService";

import {
  RegisterErrors,
  RegisterForm,
} from "../types/auth";

import {
  validateStep1,
  validateStep2,
  hasErrors,
} from "../validators/registerValidator";

export default function useRegister() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    currency: "INR",
  });

  const [errors, setErrors] = useState<RegisterErrors>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = <K extends keyof RegisterForm>(
    field: K,
    value: RegisterForm[K]
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

  const nextStep = () => {
    if (step === 1) {
      const validation = validateStep1(form);

      if (hasErrors(validation)) {
        setErrors(validation);
        return;
      }
    }

    if (step === 2) {
      const validation = validateStep2(form);

      if (hasErrors(validation)) {
        setErrors(validation);
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const register = async () => {
    try {
      setLoading(true);
      setServerError("");

      const response = await authService.register({
        name: form.fullName,
        email: form.email,
        password: form.password,
        currency: form.currency,
      });

      console.log("Registration successful:", response);

      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
    setServerError(error.message);
  } else {
    setServerError("Registration failed. Please try again.");
  }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    step,
    loading,
    serverError,

    setStep,
    setForm,

    updateField,
    nextStep,
    previousStep,
    register,
  };
}