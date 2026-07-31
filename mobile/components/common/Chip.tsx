import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

type Props = {
  title: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function Chip({
  title,
  selected = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.selected,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,

    borderRadius: radius.full,

    borderWidth: 1,
    borderColor: colors.border,

    backgroundColor: colors.input,
  },

  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  text: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },

  selectedText: {
    color: colors.background,
  },
});