import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { colors, spacing, typography } from "../../theme";
import PeriodSelector from "../../components/analytics/PeriodSelector";
import CategorySpendingCard from "../../components/analytics/CategorySpendingCard";
import StatsCard from "../../components/analytics/StatsCard";
import SpendingTrendCard from "../../components/analytics/SpendTrendCard";

export default function AnalyticsScreen() {
    const [period, setPeriod] = useState<"W" | "M" | "Y">("M");
  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ScreenHeader title="Analytics" />

        <View style={styles.header}>
  <View>
    <Text style={styles.subtitle}>
      INSIGHTS
    </Text>

    <Text style={styles.title}>
      Analytics
    </Text>
  </View>

  <PeriodSelector
    selected={period}
    onSelect={setPeriod}
  />
</View>

<CategorySpendingCard />
<SpendingTrendCard />
<View style={styles.statsRow}>
  <StatsCard
    title="Income"
    amount="₹8,500"
    icon="trending-down"
    iconColor={colors.income}
  />

  <View style={{ width: spacing.md }} />

  <StatsCard
    title="Expense"
    amount="₹5,200"
    icon="trending-up"
    iconColor={colors.expense}
  />
</View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginBottom: spacing.xl,
},

subtitle: {
  color: colors.textSecondary,

  letterSpacing: 2,

  fontSize: typography.size.xs,

  fontWeight: typography.weight.semibold,
},

title: {
  color: colors.textPrimary,

  fontSize: typography.size.xxxl,

  fontWeight: typography.weight.bold,

  marginTop: spacing.s,
},

statsRow: {
  flexDirection: "row",

  marginBottom: spacing.xl,
},
});