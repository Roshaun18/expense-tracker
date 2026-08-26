import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import expenseService, {
  Expense,
} from "../services/expenseService";

export default function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await expenseService.getExpenses();

      console.log("All expenses:", data);

      setExpenses(data ?? []);
    } catch (error) {
      console.error("Expenses error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load expenses");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [loadExpenses])
  );

  return {
    expenses,
    loading,
    error,
    refresh: loadExpenses,
  };
}