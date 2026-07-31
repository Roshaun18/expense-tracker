import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors, spacing, typography, radius } from "../../theme";

type Props = {
  title: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({
  title,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,

    borderRadius: radius.full,

    borderWidth: 1,
    borderColor: colors.border,

    backgroundColor: colors.cardOverlay,

    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },

  selectedContainer: {
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
    fontWeight: typography.weight.bold,
  },
});