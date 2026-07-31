import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../../theme";

type Filter = "all" | "income" | "expense";

type Props = {
  selected: Filter;
  onSelect: (filter: Filter) => void;
};

const filters: {
  label: string;
  value: Filter;
}[] = [
  { label: "All", value: "all" },
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export default function FilterChips({
  selected,
  onSelect,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const active = selected === filter.value;

        return (
          <TouchableOpacity
            key={filter.value}
            onPress={() => onSelect(filter.value)}
            style={[
              styles.chip,
              active && styles.activeChip,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.activeText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.lg,
  },

  chip: {
    paddingHorizontal: spacing.lg,
    height: 40,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: radius.full,

    marginRight: spacing.md,

    backgroundColor: colors.input,

    borderWidth: 1,
    borderColor: colors.border,
  },

  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  text: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },

  activeText: {
    color: colors.background,
  },
});