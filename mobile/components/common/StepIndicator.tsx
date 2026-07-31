import { View, StyleSheet } from "react-native";

import { colors, spacing } from "../../theme";

type Props = {
  currentStep: number;
  totalSteps?: number;
};

export default function StepIndicator({
  currentStep,
  totalSteps = 4,
}: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const active = index < currentStep;

        return (
          <View
            key={index}
            style={[
              styles.bar,
              active && styles.activeBar,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: spacing.xxl,
    gap: spacing.sm,
  },

  bar: {
    flex: 1,
    height: 6,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },

  activeBar: {
    backgroundColor: colors.primary,
  },
});