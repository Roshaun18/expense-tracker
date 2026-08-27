import { View, Text, StyleSheet } from "react-native";
import DonutChart from "./DonutChart";
import {
  colors,
  radius,
  spacing,
  typography,
} from "../../theme";
import { CategorySummary } from "../../services/analyticsService";

type Props = {
  data: CategorySummary[];
};

export default function CategorySpendingCard({data}: Props) {
  const categoryColors = [
    {
      startColor: colors.expense,
      endColor: colors.danger,
    },
    {
      startColor: colors.primary,
      endColor: colors.electric,
    },
    {
      startColor: colors.violet,
      endColor: colors.electric,
    },
    {
      startColor: colors.chartEntertainment,
      endColor: colors.primary,
    },
    {
      startColor: colors.chartTransport,
      endColor: colors.electric,
    },
  ];
  
  const chartData = data.map((item, index) => ({
    title: item.category,
    value: item.amount,
    startColor:
      categoryColors[index % categoryColors.length].startColor,
    endColor:
      categoryColors[index % categoryColors.length].endColor,
  }));

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
          ₹{totalSpent.toLocaleString("en-IN")}
        </Text>
      </View>

      <View style={styles.chartPlaceholder}>
        {chartData.length > 0 ? (
          <DonutChart
            centerValue={`₹${totalSpent.toLocaleString("en-IN")}`}
            centerTitle="Total"
            data={chartData}
          />
        ) : (
          <Text style={styles.placeholderText}>
            No spending data yet.
          </Text>
        )}
      </View>

      {chartData.map((item, index) => (
  <View
    key={`${item.title}-${index}`}
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
      ₹{item.value.toLocaleString("en-IN")}
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
    fontSize: typography.size.sm,
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