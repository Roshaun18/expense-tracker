import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useState } from "react";
import { colors, spacing, typography } from "../../theme";
import PeriodSelector from "../../components/analytics/PeriodSelector";
import CategorySpendingCard from "../../components/analytics/CategorySpendingCard";
import StatsCard from "../../components/analytics/StatsCard";
import SpendingTrendCard from "../../components/analytics/SpendTrendCard";
import useCategoryAnalytics from "../../hooks/useCategoryAnalytics";

export default function AnalyticsScreen() {
    const [period, setPeriod] = useState<"W" | "M" | "Y">("M");
    const {
    data: categoryData,
    loading,
    error,
  } = useCategoryAnalytics();

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

{loading && (
          <View style={styles.loading}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text style={styles.info}>
              Loading analytics...
            </Text>
          </View>
        )}

        {!loading && error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        {!loading && error === "" && (
          <>
            <CategorySpendingCard
              data={categoryData}
            />

            <SpendingTrendCard />

            <View style={styles.statsRow}>
              <StatsCard
                title="Income"
                amount="₹0"
                icon="trending-down"
                iconColor={colors.income}
              />

              <View
                style={{ width: spacing.md }}
              />

              <StatsCard
                title="Expense"
                amount="₹0"
                icon="trending-up"
                iconColor={colors.expense}
              />
            </View>
          </>
        )}
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

loading: {
    alignItems: "center",
    marginVertical: spacing.xl,
  },

  info: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: spacing.sm,
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginVertical: spacing.xl,
  },
});