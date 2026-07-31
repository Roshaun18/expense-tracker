import Header from "../../components/dashboard/Header";
import BalanceCard from "../../components/dashboard/BalanceCard";
import ScreenBackground from "../../components/common/ScreenBackground";
import { StyleSheet, ScrollView, View } from "react-native";
import { spacing } from "../../theme";
import ActionButton from "../../components/dashboard/ActionButton";
import QuickActions from "../../components/dashboard/QuickActions";
import MonthlySpendingCard from "../../components/dashboard/MonthlySpendingCard";
import TipCard from "../../components/dashboard/TipCard";
import TransactionCard from "../../components/dashboard/TransactionCard";

export default function DashboardScreen() {
  return (
    <ScreenBackground>
            <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
                <Header />
      <BalanceCard
        balance={14800}
        income={15000}
        expense={200}
        savings={14800}
        hidden={false}
      />
      <QuickActions />

      <MonthlySpendingCard
  spent={200}
  budget={2000}
/>

<TipCard />
<TransactionCard />
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