import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import analyticsService, {
  PeriodSummary,
} from "../services/analyticsService";

type Period = "W" | "M" | "Y";

export default function usePeriodSummary(period: Period) {
  const [data, setData] = useState<PeriodSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPeriodSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await analyticsService.getPeriodSummary(period);

      console.log("Period summary:", response);

      setData(response);
    } catch (error) {
      console.error("Period summary error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load period summary");
      }
    } finally {
      setLoading(false);
    }
  }, [period]);

  useFocusEffect(
    useCallback(() => {
      loadPeriodSummary();
    }, [loadPeriodSummary])
  );

  return {
    data,
    loading,
    error,
    refresh: loadPeriodSummary,
  };
}