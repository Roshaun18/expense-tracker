import { useState } from "react";
import SearchBar from "../../components/history/SearchBar";
import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import FilterChips from "../../components/history/FilterChip";
import { ScrollView, StyleSheet } from "react-native";
import HistoryCard from "../../components/history/HistoryCard";
import { spacing } from "../../theme";

export default function HistoryScreen() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<
  "all" | "income" | "expense"
>("all");

const todayTransactions = [
  {
    title: "Salary",
    category: "Income",
    amount: 15000,
    type: "income" as const,
  },
  {
    title: "Coffee",
    category: "Food",
    amount: 250,
    type: "expense" as const,
  },
];

const yesterdayTransactions = [
  {
    title: "Shopping",
    category: "Lifestyle",
    amount: 1200,
    type: "expense" as const,
  },
  {
    title: "Freelance",
    category: "Income",
    amount: 5000,
    type: "income" as const,
  },
];

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ScreenHeader title="History" />
        <SearchBar
  value={search}
  onChangeText={setSearch}
/>
    <FilterChips
  selected={filter}
  onSelect={setFilter}
/>
<HistoryCard
  title="Today"
  transactions={todayTransactions}
/>

<HistoryCard
  title="Yesterday"
  transactions={yesterdayTransactions}
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
});