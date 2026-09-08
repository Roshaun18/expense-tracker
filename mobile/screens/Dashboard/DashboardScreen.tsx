import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import Header from "../../components/dashboard/Header";
import BalanceCard from "../../components/dashboard/BalanceCard";
import ScreenBackground from "../../components/common/ScreenBackground";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { spacing, colors } from "../../theme";
import ActionButton from "../../components/dashboard/ActionButton";
import QuickActions from "../../components/dashboard/QuickActions";
import MonthlySpendingCard from "../../components/dashboard/MonthlySpendingCard";
import TipCard from "../../components/dashboard/TipCard";
import TransactionCard from "../../components/dashboard/TransactionCard";
import useDashboard from "../../hooks/useDashboard";
import useRecentExpenses from "../../hooks/useRecentExpenses";
import useMonthlyLimit from "../../hooks/useMonthlyLimit";
import notificationService from "../../services/notificationService";
import notificationStorage, {
  AppNotification,
} from "../../services/notificationStorage";
import NotificationPanel from "../../components/dashboard/NotificationPanel";

export default function DashboardScreen() {
  const {summary, loading, error}= useDashboard();
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
const [showNotifications, setShowNotifications] = useState(false);
const handleClearNotifications = async () => {
  await notificationStorage.clearNotifications();
  setNotifications([]);
};  
const {
  expenses,
  loading: transactionsLoading,
  error: transactionsError,
} = useRecentExpenses();
const {
  monthlyLimit,
  loading: limitLoading,
  error: limitError,
} = useMonthlyLimit();

useEffect(() => {
  notificationService.requestPermission();
}, []);

  useFocusEffect(
  useCallback(() => {
    const loadNotifications = async () => {
      const storedNotifications =
        await notificationStorage.getNotifications();

      setNotifications(storedNotifications);
    };

    loadNotifications();
  }, [])
);

  if (loading) {
    return (
      <ScreenBackground>
        <View style={styles.container}>
          {/* use your existing loading component if you have one */}
        </View>
      </ScreenBackground>
    );
  }

  if (error) {
    return (
      <ScreenBackground>
        <View style={styles.container}>
          <Text style={{ color: colors.danger }}>
            {error}
          </Text>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
            <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
                <Header
  notificationCount={notifications.length}
  onNotificationPress={() =>
    setShowNotifications((previous) => !previous)
  }
/>
{showNotifications && (
  <NotificationPanel
    notifications={notifications}
    onClear={handleClearNotifications}
  />
)}
      <BalanceCard
        balance={summary?.balance ?? 0}
        income={summary?.totalIncome ?? 0}
        expense={summary?.totalExpense ?? 0}
        savings={(summary?.totalIncome ?? 0) - (summary?.totalExpense ?? 0)} 
        hidden={balanceHidden}
  onToggleVisibility={() =>
    setBalanceHidden((previous) => !previous)
  }
      />
      <QuickActions />

      <MonthlySpendingCard
  spent={summary?.totalExpense ?? 0}
  budget={monthlyLimit}
/>

<TransactionCard
  expenses={expenses}
  loading={transactionsLoading}
  error={transactionsError}
/>
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
  
  actionRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: spacing.md,
  marginBottom: spacing.xl,
},
});