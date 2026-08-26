import { TouchableOpacity, Text, StyleSheet, ActivityIndicator,} from "react-native";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

type Props = {
  title: string;
  loading?: boolean;
  onPress: () => void;
};

export default function SaveButton({
  title,
  loading = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        loading && styles.disabled,
      ]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.background}
        />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
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
  disabled: {
    opacity: 0.6,
  },
});