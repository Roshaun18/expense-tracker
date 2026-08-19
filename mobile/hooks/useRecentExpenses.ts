import { useCallback, useEffect, useState } from "react";
import expenseService, {
  Expense,
} from "../services/expenseService";

export default function useRecentExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecentExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await expenseService.getRecentExpenses();

      setExpenses(data ?? []);
    } catch (error) {
      console.error("Recent expenses error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load recent transactions");
      }
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecentExpenses();
  }, [loadRecentExpenses]);

  return {
    expenses,
    loading,
    error,
    refresh: loadRecentExpenses,
  };
}