import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, typography } from "../../theme";

type HeaderProps = {
  name?: string;
};

export default function Header({
  name = "Roshaun",
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Good Morning 👋
        </Text>

        <Text style={styles.name}>
          {name}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.textPrimary}
          />
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: spacing.xl,
  },

  greeting: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },

  name: {
    marginTop: spacing.s,

    color: colors.textPrimary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    marginRight: spacing.md,
  },

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: colors.background,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
});