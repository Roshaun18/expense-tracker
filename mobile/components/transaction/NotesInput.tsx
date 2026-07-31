import { View, Text, TextInput, StyleSheet } from "react-native";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function NotesInput({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a note..."
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },

  label: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.sm,
  },

  input: {
    minHeight: 120,

    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,

    backgroundColor: colors.input,

    padding: spacing.lg,

    color: colors.textPrimary,
    fontSize: typography.size.md,
  },
});