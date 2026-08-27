import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import analyticsService, {
  MonthlySummary,
} from "../services/analyticsService";

export default function useMonthlyAnalytics() {
  const [data, setData] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMonthlySummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await analyticsService.getMonthlySummary();

      console.log("Monthly analytics:", response);

      setData(response ?? []);
    } catch (error) {
      console.error(
        "Monthly analytics error:",
        error
      );

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load monthly analytics");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMonthlySummary();
    }, [loadMonthlySummary])
  );

  return {
    data,
    loading,
    error,
    refresh: loadMonthlySummary,
  };
}