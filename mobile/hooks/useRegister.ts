import { useState } from "react";

import { RegisterErrors, RegisterForm } from "../types/auth";
import {
  validateStep1,
  validateStep2,
  hasErrors,
} from "../validators/registerValidator";

export default function useRegister() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    currency: "INR",
    interests: [],
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

  return {
    form,
    errors,
    step,

    setStep,
    setForm,

    updateField,
    nextStep,
    previousStep,
  };
}