import { View, Text, StyleSheet } from "react-native";

import BarChart from "./BarChart";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../../theme";

export default function SpendingTrendCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>
        TREND
      </Text>

      <Text style={styles.title}>
        Weekly Income vs Expense
      </Text>

      <BarChart
        income={[420, 510, 380, 620, 480, 700, 560]}
        expense={[260, 330, 300, 430, 360, 520, 410]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,

    borderRadius: radius.xl,

    borderWidth: 1,
    borderColor: colors.border,

    padding: spacing.lg,

    marginBottom: spacing.xl,
  },

  subtitle: {
    color: colors.textSecondary,

    fontSize: typography.size.sm,

    letterSpacing: 1,
  },

  title: {
    color: colors.textPrimary,

    fontSize: typography.size.xl,

    fontWeight: typography.weight.bold,

    marginTop: spacing.s,

    marginBottom: spacing.lg,
  },
});