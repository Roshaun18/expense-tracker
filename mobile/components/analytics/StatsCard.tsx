import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

type Props = {
  title: string;
  amount: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
};

export default function StatsCard({
  title,
  amount,
  icon,
  iconColor,
}: Props) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${iconColor}20`,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={iconColor}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.amount}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor: colors.card,

    borderRadius: radius.xl,

    borderWidth: 1,
    borderColor: colors.border,

    padding: spacing.lg,
  },

  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: radius.full,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: spacing.md,
  },

  title: {
    color: colors.textSecondary,

    fontSize: typography.size.sm,
  },

  amount: {
    marginTop: spacing.sm,

    color: colors.textPrimary,

    fontSize: typography.size.xl,

    fontWeight: typography.weight.bold,
  },
});