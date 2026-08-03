import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={48}
          color={colors.textPrimary}
        />
      </View>

      <Text style={styles.name}>
        Roshaun N.U.
      </Text>

      <Text style={styles.email}>
        roshaun@example.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },

  avatar: {
    width: 110,
    height: 110,

    borderRadius: radius.full,

    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: spacing.lg,
  },

  name: {
    color: colors.textPrimary,

    fontSize: typography.size.xxl,

    fontWeight: typography.weight.bold,
  },

  email: {
    marginTop: spacing.sm,

    color: colors.textSecondary,

    fontSize: typography.size.md,
  },
});