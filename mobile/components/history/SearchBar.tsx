import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../../theme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color={colors.textSecondary}
      />

      <TextInput
        style={styles.input}
        placeholder="Search transactions"
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.input,

    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,

    paddingHorizontal: spacing.lg,
    height: 52,

    marginBottom: spacing.lg,
  },

  input: {
    flex: 1,
    marginLeft: spacing.md,

    color: colors.textPrimary,
    fontSize: typography.size.md,
  },
});