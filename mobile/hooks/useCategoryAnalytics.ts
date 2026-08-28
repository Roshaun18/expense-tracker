import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import analyticsService, {
  CategorySummary,
} from "../services/analyticsService";

type Period = "W" | "M" | "Y";

export default function useCategoryAnalytics(period: Period) {
  const [data, setData] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategorySummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await analyticsService.getCategorySummary(period);

      console.log("Category analytics:", response);

      setData(response ?? []);
    } catch (error) {
      console.error(
        "Category analytics error:",
        error
      );

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load category analytics");
      }
    } finally {
      setLoading(false);
    }
  }, [period]);

  useFocusEffect(
    useCallback(() => {
      loadCategorySummary();
    }, [loadCategorySummary])
  );

  return {
    data,
    loading,
    error,
    refresh: loadCategorySummary,
  };
}