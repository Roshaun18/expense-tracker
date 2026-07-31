import { TouchableOpacity, Text, StyleSheet } from "react-native";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

type Props = {
  title: string;
  onPress: () => void;
};

export default function SaveButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: radius.full,

    backgroundColor: colors.primary,

    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },

  text: {
    color: colors.background,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },
});