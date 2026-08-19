import { View, Text, StyleSheet, Pressable } from "react-native";

import TransactionItem from "./TransactionItem";

import {
  colors,
  spacing,
  typography,
  glass,
  radius,
} from "../../theme";

import { Expense } from "../../services/expenseService";

interface TransactionCardProps {
  expenses: Expense[];
  loading: boolean;
  error: string;
}

export default function TransactionCard({
  expenses,
  loading,
  error,
}: TransactionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Recent Transactions
        </Text>

        <Pressable>
          <Text style={styles.viewAll}>
            View All
          </Text>
        </Pressable>
      </View>
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

      {!loading && error === "" && (expenses?.length ?? 0) === 0 && (
        <Text style={styles.info}>
          No transactions yet.
        </Text>
      )}

      {!loading &&
        error === "" &&
        expenses?.map((expense) => (
          <TransactionItem
            key={expense.id}
            title={expense.title}
            category={expense.category}
            amount={expense.amount}
            type={expense.type}
          />
        ))}
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glass.card,

    borderRadius: radius.xl,

    padding: spacing.lg,

    marginBottom: spacing.xl,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: spacing.md,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  viewAll: {
    color: colors.primary,
    fontSize: typography.size.sm,
  },

  info: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    textAlign: "center",
    paddingVertical: spacing.md,
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    textAlign: "center",
    paddingVertical: spacing.md,
  },
});