import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { colors, spacing, typography } from "../../theme";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export default function TextField({
  label,
  error,
  ...props
}: Props) {
    const [focused, setFocused] = useState(false);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        style={[
          styles.input,
          focused && styles.inputFocused,
        ]}
        placeholderTextColor={colors.textSecondary}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.lg,
  },

  label: {
    color: colors.textPrimary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.sm,
  },

  input: {
    height: 58,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,

    backgroundColor: colors.input,

    paddingHorizontal: spacing.md,

    color: colors.textPrimary,

    fontSize: typography.size.md,
  },
   inputFocused: {
    borderColor: colors.primary,
  },

  error: {
    marginTop: spacing.s,

    color: colors.danger,

    fontSize: typography.size.sm,
  },
});