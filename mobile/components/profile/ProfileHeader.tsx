import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

type Props = {
  name: string;
  email: string;
};

export default function ProfileHeader({
  name, email,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={48}
          color={colors.textPrimary}
          onPress={()=>router.push("/settings")}
        />
      </View>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.email}>
        {email}
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