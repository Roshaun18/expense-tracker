import { View, Text, StyleSheet, ScrollView } from "react-native";

import BarChart from "./BarChart";

import { MonthlySummary } from "../../services/analyticsService";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../../theme";

type Props = {
  data: MonthlySummary[];
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function SpendingTrendCard({data}: Props) {
  const income = monthLabels.map((_, index) => {
    const month = data.find(
      (item) => item.month === index + 1
    );

    return month?.income ?? 0;
  });

  const expense = monthLabels.map((_, index) => {
    const month = data.find(
      (item) => item.month === index + 1
    );

    return month?.expense ?? 0;
  });

  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>
        TREND
      </Text>

      <Text style={styles.title}>
        Monthly Income vs Expense
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <BarChart
          income={income}
          expense={expense}
          labels={monthLabels}
        />
      </ScrollView>
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