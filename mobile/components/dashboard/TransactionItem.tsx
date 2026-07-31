import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  typography,
} from "../../theme";

type Props = {
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export default function TransactionItem({
  title,
  category,
  amount,
  type,
}: Props) {
  const isIncome = type === "income";

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isIncome
                ? "#13D97F22"
                : "#FF697222",
            },
          ]}
        >
          <Ionicons
            name={isIncome ? "trending-down" : "trending-up"}
            size={18}
            color={isIncome ? colors.income : colors.expense}
          />
        </View>

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.category}>
            {category}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: isIncome
              ? colors.income
              : colors.expense,
          },
        ]}
      >
        {isIncome ? "+" : "-"}₹
        {amount.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,

  borderRadius: 24,

  borderWidth: 1,
  borderColor: colors.border,

  backgroundColor: colors.card,

  marginBottom: spacing.md,
},

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    marginRight: spacing.lg,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  category: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: 2,
  },

  amount: {
    fontWeight: typography.weight.bold,
    fontSize: typography.size.lg,
  },
});