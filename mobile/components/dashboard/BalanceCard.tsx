import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GlassCard from "../common/GlassCard";
import SpendingCard from "./SpendingCard";
import { colors, gradients, radius, spacing, typography } from "../../theme";

type BalanceCardProps = {
  balance: number;
  income: number;
  expense: number;
  savings: number;
  hidden?: boolean;
  onToggleVisibility?: () => void;
};

export default function BalanceCard({
  balance,
  income,
  expense,
  savings,
  hidden = false,
  onToggleVisibility,
}: BalanceCardProps) {
  return (
    <LinearGradient
      colors={gradients.balanceCard}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.label}>CURRENT BALANCE</Text>

        <Pressable onPress={onToggleVisibility} hitSlop={10}>
          <Ionicons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      </View>

      <Text style={styles.balance}>
        {hidden
          ? "••••••••"
          : `₹ ${balance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}`}
      </Text>

      <View style={styles.cards}>
        <SpendingCard
          title="Income"
          amount={income}
          icon="arrow-down-circle-outline"
          iconColor={colors.income}
        />

        <SpendingCard
          title="Expense"
          amount={expense}
          icon="arrow-up-circle-outline"
          iconColor={colors.expense}
        />

        <SpendingCard
          title="Savings"
          amount={savings}
          icon="wallet-outline"
          iconColor={colors.primary}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xxl,
    padding: spacing.lg,
    borderWidth: 0.7,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: typography.weight.semibold,
  },

  balance: {
    marginTop: spacing.md,
    color: colors.textPrimary,
    fontSize: typography.size.hero,
    fontWeight: typography.weight.bold,
  },

  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    color: colors.textSecondary,
    fontSize: typography.size.md,
  },

  cards: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});