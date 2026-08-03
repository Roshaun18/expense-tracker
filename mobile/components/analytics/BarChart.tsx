import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect } from "react-native-svg";

import {
  colors,
  spacing,
  typography,
} from "../../theme";

type Props = {
  income: number[];
  expense: number[];
  labels: string[];
};

export default function BarChart({
  income,
  expense,
  labels,
}: Props) {
  const chartHeight = 180;

  const groupWidth = 40;

  const barWidth = 14;

  const gap = 4;

  const maxValue = Math.max(
    ...income,
    ...expense
  );

  return (
    <View>

      <Svg
        width={groupWidth * labels.length}
        height={chartHeight}
      >

        {income.map((value, index) => {
          const height =
            (value / maxValue) *
            chartHeight;

          return (
            <Rect
              key={`income-${index}`}
              x={index * groupWidth}
              y={chartHeight - height}
              width={barWidth}
              height={height}
              rx={8}
              fill={colors.income}
            />
          );
        })}

        {expense.map((value, index) => {
          const height =
            (value / maxValue) *
            chartHeight;

          return (
            <Rect
              key={`expense-${index}`}
              x={
                index * groupWidth +
                barWidth +
                gap
              }
              y={chartHeight - height}
              width={barWidth}
              height={height}
              rx={6}
              fill={colors.expense}
            />
          );
        })}

      </Svg>

      <View style={styles.labels}>
        {labels.map((day) => (
          <Text
            key={day}
            style={styles.label}
          >
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.legend}>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  colors.income,
              },
            ]}
          />

          <Text style={styles.legendText}>
            Income
          </Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  colors.expense,
              },
            ]}
          />

          <Text style={styles.legendText}>
            Expense
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  labels: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: spacing.md,
  },

  label: {
    width: 40,

    textAlign: "center",

    color: colors.textSecondary,

    fontSize: typography.size.sm,
  },

  legend: {
    flexDirection: "row",

    justifyContent: "center",

    marginTop: spacing.lg,
  },

  legendItem: {
    flexDirection: "row",

    alignItems: "center",

    marginHorizontal: spacing.md,
  },

  dot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    marginRight: spacing.sm,
  },

  legendText: {
    color: colors.textSecondary,

    fontSize: typography.size.sm,
  },
});