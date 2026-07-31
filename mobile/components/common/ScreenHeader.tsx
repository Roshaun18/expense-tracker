import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  colors,
  spacing,
  typography,
} from "../../theme";

type Props = {
  title: string;
};

export default function ScreenHeader({
  title,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.8}
        style={styles.backButton}
      >
        <Ionicons
          name="chevron-back"
          size={26}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      {/* keeps the title centered */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: spacing.xl,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.cardOverlay,
    borderWidth: 1,
    borderColor: colors.border,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
  },

  placeholder: {
    width: 42,
  },
});