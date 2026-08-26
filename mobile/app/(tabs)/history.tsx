import { Redirect } from "expo-router";
import HistoryScreen from "../../screens/History/HistoryScreen";
import useExpenses from "../../hooks/useExpenses";

export default function History() {
  const {
  expenses,
  loading,
  error,
} = useExpenses();

   return (
    <HistoryScreen
      expenses={expenses}
      loading={loading}
      error={error}
    />
  );
}