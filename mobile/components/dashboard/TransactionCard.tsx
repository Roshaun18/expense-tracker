import { View, Text, StyleSheet, Pressable } from "react-native";

import TransactionItem from "./TransactionItem";

import {
  colors,
  spacing,
  typography,
  glass,
  radius,
} from "../../theme";

export default function TransactionCard() {
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

      <TransactionItem
        title="Salary"
        category="Income"
        amount={45000}
        type="income"
      />

      <TransactionItem
        title="Starbucks"
        category="Food & Drinks"
        amount={220}
        type="expense"
      />

      <TransactionItem
        title="Netflix"
        category="Subscription"
        amount={649}
        type="expense"
      />
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
});