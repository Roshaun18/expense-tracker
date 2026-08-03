import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import {
  colors,
  radius,
  spacing,
  typography,
} from "../../theme";

type Props = {
  selected: "W" | "M" | "Y";
  onSelect: (value: "W" | "M" | "Y") => void;
};

export default function PeriodSelector({
  selected,
  onSelect,
}: Props) {
  const options: ("W" | "M" | "Y")[] = ["W", "M", "Y"];

  return (
    <View style={styles.container}>
      {options.map((item) => {
        const active = selected === item;

        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              active && styles.activeButton,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.text,
                active && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    backgroundColor: colors.surface,

    borderRadius: radius.lg,

    padding: 4,

    borderWidth: 1,
    borderColor: colors.border,
  },

  button: {
    width: 38,
    height: 30,

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: colors.primary,
  },

  text: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },

  activeText: {
    color: colors.white,
  },
});