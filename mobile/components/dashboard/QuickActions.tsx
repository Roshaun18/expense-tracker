import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import ActionButton from "./ActionButton";
import { spacing } from "../../theme";

export default function QuickActions() {
  return (
    <View style={styles.container}>
      <ActionButton
        title="Add Income"
        icon="add"
        onPress={() => router.push("/add-income")}
      />

      <ActionButton
        title="Add Expense"
        icon="remove"
        onPress={() => router.push("/add-expense")}
      />

      <ActionButton
        title="History"
        icon="list"
        onPress={() => router.push("/history")}
      />

      <ActionButton
        title="Analytics"
        icon="pie-chart"
        onPress={() => router.push("/analytics")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
});