import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  radius,
  spacing,
  typography,
  glass,
} from "../../theme";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export default function ActionButton({
  title,
  icon,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.primary}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.surface,

    flex: 1,

    height: 84,

    borderRadius: radius.xl,

    justifyContent: "center",
    alignItems: "center",

    gap: spacing.sm,
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.sm,
    textAlign: "center",
  },
});