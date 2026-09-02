import { View, Text, StyleSheet, Switch } from "react-native";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../../theme";

type Props = {
  dailyReminders: boolean;
  budgetAlerts: boolean;
  onDailyRemindersChange: (value: boolean) => void;
  onBudgetAlertsChange: (value: boolean) => void;
};

export default function NotificationSettings({
  dailyReminders,
  budgetAlerts,
  onDailyRemindersChange,
  onBudgetAlertsChange,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.title}>
            Daily reminders
          </Text>

          <Text style={styles.description}>
            Log expenses each evening
          </Text>
        </View>

        <Switch
          value={dailyReminders}
          onValueChange={onDailyRemindersChange}
          trackColor={{
            false: colors.border,
            true: colors.primary,
          }}
          thumbColor={colors.textPrimary}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.title}>
            Budget alerts
          </Text>

          <Text style={styles.description}>
            When you near your monthly limit
          </Text>
        </View>

        <Switch
          value={budgetAlerts}
          onValueChange={onBudgetAlertsChange}
          trackColor={{
            false: colors.border,
            true: colors.primary,
          }}
          thumbColor={colors.textPrimary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },

  row: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  info: {
    flex: 1,
    marginRight: spacing.md,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
  },

  description: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: spacing.s,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});