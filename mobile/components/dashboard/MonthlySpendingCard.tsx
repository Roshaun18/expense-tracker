import { View, Text, StyleSheet } from "react-native";

import {
  colors,
  spacing,
  typography,
  radius,
  glass,
} from "../../theme";


type Props = {
  spent: number;
  budget: number;
};

export default function MonthlySpendingCard({
  spent,
  budget,
}: Props) {
  const progress = spent / budget;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        MONTHLY SPENDING
      </Text>

    <View style={styles.amountRow}>
        <Text style={styles.amount}>
        ₹{spent.toLocaleString()} 
      </Text>
      <Text style={styles.limit}>
        of ₹{budget.toLocaleString()}
      </Text>
    </View>
      

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${Math.min(progress * 100, 100)}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.percent}>
        {(progress * 100).toFixed(0)}% of your monthly guideline used
      </Text>
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

  title: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    letterSpacing: 2,
  },

  amount: {
    marginTop: spacing.md,

    color: colors.textPrimary,

    fontSize: typography.size.lg,

    fontWeight: typography.weight.bold,
  },

  progressBackground: {
    height: 10,

    marginTop: spacing.lg,

    borderRadius: radius.full,

    backgroundColor: colors.input,

    overflow: "hidden",
  },

  progress: {
    flex: 1,

    backgroundColor: colors.primary,

    borderRadius: radius.full,
  },

  percent: {
    marginTop: spacing.sm,

    color: colors.textSecondary,

    fontSize: typography.size.xs,
  },
  
  amountRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.md,
},

limit: {
  color: colors.textSecondary,
  fontSize: typography.size.sm,
},
});