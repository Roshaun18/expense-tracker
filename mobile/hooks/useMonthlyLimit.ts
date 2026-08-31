import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import userService from "../services/userService";

export default function useMonthlyLimit() {
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMonthlyLimit = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userService.getMonthlyLimit();

      console.log("Monthly limit:", response);

      setMonthlyLimit(response.monthlyLimit ?? 0);
    } catch (error) {
      console.error("Monthly limit error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load monthly limit");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMonthlyLimit();
    }, [loadMonthlyLimit])
  );

  const updateMonthlyLimit = async (limit: number) => {
    try {
      setError("");

      const response = await userService.updateMonthlyLimit(limit);

      setMonthlyLimit(response.monthlyLimit);

      return true;
    } catch (error) {
      console.error("Update monthly limit error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update monthly limit");
      }

      return false;
    }
  };

  return {
    monthlyLimit,
    loading,
    error,
    updateMonthlyLimit,
    refresh: loadMonthlyLimit,
  };
}