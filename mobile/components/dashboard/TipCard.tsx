import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  typography,
  radius,
  glass,
} from "../../theme";

export default function TipCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons
          name="bulb"
          size={22}
          color="#FFD54A"
        />

        <Text style={styles.title}>
          Financial Tip
        </Text>
      </View>

      <Text style={styles.description}>
        Try keeping your monthly spending below 80% of your budget to improve your savings.
      </Text>

      <Pressable>
        <Text style={styles.link}>
          Learn More →
        </Text>
      </Pressable>
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
    alignItems: "center",
    gap: spacing.sm,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  description: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    lineHeight: 22,

    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  link: {
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
});