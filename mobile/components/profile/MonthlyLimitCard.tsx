import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  colors,
  spacing,
  typography,
  radius,
  glass,
} from "../../theme";
import useMonthlyLimit from "../../hooks/useMonthlyLimit";

export default function MonthlyLimitCard() {
  const {
    monthlyLimit,
    loading,
    error,
    updateMonthlyLimit,
  } = useMonthlyLimit();

  const [value, setValue] = useState("");

  const handleSave = async () => {
    const limit = Number(value);

    if (!limit || limit <= 0) {
      return;
    }

    const success = await updateMonthlyLimit(limit);

    if (success) {
      setValue("");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        MONTHLY LIMIT
      </Text>

      {loading ? (
        <Text style={styles.info}>
          Loading...
        </Text>
      ) : (
        <>
          <Text style={styles.current}>
            Current limit:{" "}
            {monthlyLimit > 0
              ? `₹${monthlyLimit.toLocaleString("en-IN")}`
              : "Not set"}
          </Text>

          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Enter monthly limit"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            style={styles.input}
          />

          <Pressable
            style={styles.button}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>
              Save Limit
            </Text>
          </Pressable>

          {error !== "" && (
            <Text style={styles.error}>
              {error}
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glass.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  title: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    letterSpacing: 2,
  },

  current: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    marginTop: spacing.md,
  },

  input: {
    marginTop: spacing.md,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.input,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    fontSize: typography.size.md,
  },

  button: {
    marginTop: spacing.md,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.background,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  info: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: spacing.md,
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    marginTop: spacing.sm,
  },
});