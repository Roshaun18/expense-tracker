import { View, Text, StyleSheet } from "react-native";
import DonutChart from "./DonutChart";
import {
  colors,
  radius,
  spacing,
  typography,
} from "../../theme";

export default function CategorySpendingCard() {
  const chartData = [
  {
    title: "Food & Dining",
    value: 200,
    startColor: colors.expense,
    endColor: colors.danger,
  },
  {
    title: "Shopping",
    value: 120,
    startColor: colors.primary,
    endColor: colors.electric,
  },
  {
    title: "Transport",
    value: 280,
    startColor: colors.violet,
    endColor: colors.electric,
  },
];

const totalSpent = chartData.reduce(
  (sum, item) => sum + item.value,
  0
);
    return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Spending by Category
        </Text>

        <Text style={styles.amount}>
          ₹{totalSpent}
        </Text>
      </View>

      <View style={styles.chartPlaceholder}>
        <DonutChart
  centerValue={`₹${totalSpent}`}
  centerTitle="Total"
  data={chartData}
/>
      </View>

      {chartData.map((item, index) => (
  <View
    key={index}
    style={styles.legend}
  >
    <View
      style={[
        styles.dot,
        {
          backgroundColor: item.startColor,
        },
      ]}
    />

    <Text style={styles.category}>
      {item.title}
    </Text>

    <Text style={styles.value}>
      ₹{item.value}
    </Text>
  </View>
))}
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
  },

  amount: {
    color: colors.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  chartPlaceholder: {
    height: 260,

    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: colors.textSecondary,
  },

  legend: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.s,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,

    backgroundColor: colors.expense,

    marginRight: spacing.sm,
  },

  category: {
    flex: 1,

    color: colors.textPrimary,
    
  },

  value: {
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
  },
});