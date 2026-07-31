import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, typography, radius } from "../../theme";

type SpendingCardProps = {
  title: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
};

export default function SpendingCard({
  title,
  amount,
  icon,
  iconColor,
}: SpendingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={12}
          color={iconColor}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.amount,
          { color: iconColor },
        ]}
      >
        ₹{amount.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    padding: spacing.md,

    borderRadius: radius.xl,

    backgroundColor: colors.cardOverlay,

    borderWidth: 1,
    borderColor: colors.border,
  },

  iconContainer: {
    width: 22,
    height: 22,

    borderRadius: radius.full,

    backgroundColor: colors.input,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: spacing.sm,
  },

  title: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginBottom: spacing.s,
  },

  amount: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },
});