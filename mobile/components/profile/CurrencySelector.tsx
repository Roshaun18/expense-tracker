import { View, Text, Pressable, StyleSheet } from "react-native";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../../theme";

type Props = {
  selectedCurrency: string;
  onSelect: (currency: string) => void;
};

const currencies = [
  "INR",
  "EUR",
  "USD",
  "GBP",
];

export default function CurrencySelector({
  selectedCurrency,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {currencies.map((currency) => {
        const selected =
          selectedCurrency === currency;

        return (
          <Pressable
            key={currency}
            style={[
              styles.currency,
              selected && styles.selected,
            ]}
            onPress={() => onSelect(currency)}
          >
            <Text
              style={[
                styles.text,
                selected && styles.selectedText,
              ]}
            >
              {currency}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.xl,
  },

  currency: {
    width: "25%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.lg,
  },

  selected: {
    backgroundColor: colors.primary,
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