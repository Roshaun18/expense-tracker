import { StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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

export default function AmountInput({
  value,
  onChangeText,
}: Props) {
  return (
    <LinearGradient
      colors={[
        colors.backgroundTop,
        "#2D3F74",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <Text style={styles.label}>
        AMOUNT
      </Text>

      <View style={styles.amountRow}>
        <Text style={styles.currency}>₹</Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#FFFFFF33"
          style={styles.input}
          textAlign="center"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,

    borderRadius: 28,

    borderWidth: 1,
    borderColor: colors.border,

    justifyContent: "center",

    paddingHorizontal: spacing.xl,

    marginBottom: spacing.xl,
  },

  label: {
    textAlign: "center",

    color: colors.textSecondary,

    letterSpacing: 3,

    marginBottom: spacing.lg,

    fontSize: typography.size.sm,
  },

  amountRow: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",
 alignSelf: "center",
  },

  currency: {
    color: colors.textSecondary,

    fontSize: 34,

    marginRight: 8,

    marginTop: 12,
  },

  input: {
    color: colors.textPrimary,

    fontSize: 64,

    fontWeight: typography.weight.bold,

    minWidth: 20,

    textAlign: "center",

    padding: 0,
  },
});