import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  colors,
  gradients,
  spacing,
  radius,
  typography,
} from "../../theme";

type Props = {
  name: string;
  email: string;
};

export default function ProfileCard({
  name,
  email,
}: Props) {
  const initial =
    name.charAt(0).toUpperCase();

  return (
    <LinearGradient
      colors={gradients.balanceCard}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {initial}
        </Text>
      </View>

      <View style={styles.info}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text
          style={styles.email}
          numberOfLines={1}
        >
          {email}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 112,
    borderRadius: radius.xxl,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xxl,
    borderWidth: 0.7,
    borderColor: colors.border,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },

  avatarText: {
    color: colors.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
  },

  info: {
    flex: 1,
  },

  name: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  email: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: spacing.s,
    opacity: 0.85,
  },
});