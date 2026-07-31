import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import { glass, radius, shadows, colors, spacing } from "../../theme";

type Props = {
  children: ReactNode;
};

export default function GlassCard({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    ...glass.card,
    ...shadows.sm,

    borderRadius: radius.xl,

    borderWidth: 1,
    borderColor: colors.border,

    padding: spacing.lg,
  },
});