import { useMemo, useState } from "react";
import SearchBar from "../../components/history/SearchBar";
import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import FilterChips from "../../components/history/FilterChip";
import { ScrollView, StyleSheet, Text } from "react-native";
import HistoryCard from "../../components/history/HistoryCard";
import { spacing, colors, typography } from "../../theme";
import { Expense } from "../../services/expenseService";
import { router } from "expo-router";

interface HistoryScreenProps {
  expenses: Expense[];
  loading: boolean;
  error: string;
}

export default function HistoryScreen({
  expenses,
  loading,
  error,
}: HistoryScreenProps) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<
  "all" | "income" | "expense"
>("all");

const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchText = search.toLowerCase();

        const matchesSearch =
        expense.title.toLowerCase().includes(searchText) ||
        expense.category.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "all" ||
        expense.type === filter;

      return matchesSearch && matchesFilter;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
  }, [expenses, search, filter]);

  const groupedExpenses = useMemo(() => {
    const groups: Record<string, Expense[]> = {};

    filteredExpenses.forEach((expense) => {
      const date = new Date(expense.date);

      const key = date.toDateString();

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(expense);
    });

    return Object.entries(groups).sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() -
        new Date(dateA).getTime()
    );
  }, [filteredExpenses]);

  // Convert date into Today / Yesterday / actual date
  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);

  const today = new Date();

  const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ScreenHeader title="History" />
        <SearchBar
  value={search}
  onChangeText={setSearch}
/>
    <FilterChips
  selected={filter}
  onSelect={setFilter}
/>

{loading && (
          <Text style={styles.info}>
            Loading transactions...
          </Text>
        )}

        {!loading && error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        {!loading &&
          error === "" &&
          filteredExpenses.length === 0 && (
            <Text style={styles.info}>
              No transactions found.
            </Text>
          )}

        {!loading &&
          error === "" &&
          groupedExpenses.map(
            ([date, transactions]) => (
              <HistoryCard
                key={date}
                title={getDateLabel(date)}
                transactions={transactions.map(
                  (expense) => ({
                    id: expense.id,
                    title: expense.title,
                    category: expense.category,
                    amount: expense.amount,
                    type: expense.type,
                  })
                )}
                onTransactionPress={(transaction) => {
    router.push({
      pathname: "/transaction/[id]",
      params: {
        id: transaction.id,
      },
    });
  }}
              />
            )
          )}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  info: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginTop: spacing.xl,
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});