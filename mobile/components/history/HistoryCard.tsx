import { View, Text, StyleSheet } from "react-native";

import TransactionItem from "../dashboard/TransactionItem";

import {
  colors,
  spacing,
  typography,
} from "../../theme";

type Transaction = {
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

type Props = {
  title: string;
  transactions: Transaction[];
};

export default function HistoryCard({
  title,
  transactions,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {title}
      </Text>

      {transactions.map((item, index) => (
  <View key={index}>
    <TransactionItem
      title={item.title}
      category={item.category}
      amount={item.amount}
      type={item.type}
    />

    {index !== transactions.length - 1 && (
      <View style={styles.divider} />
    )}
  </View>
))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },

  heading: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,

    marginBottom: spacing.md,
  },
  
  divider: {
  height: 1,
  backgroundColor: colors.border,
  marginVertical: spacing.sm,
},
});