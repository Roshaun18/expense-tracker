import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryChip from "../../components/transaction/CategoryChip";
import ScreenBackground from "../../components/common/ScreenBackground";
import AmountInput from "../../components/transaction/AmountInput";
import { colors, spacing, typography } from "../../theme";
import {
  incomeCategories,
  expenseCategories,
} from "../../constants/transactionCategories";
import DatePickerField from "../../components/transaction/DatePickerField";
import NotesInput from "../../components/transaction/NotesInput";
import SaveButton from "../../components/transaction/SaveButton";
import ScreenHeader from "../../components/common/ScreenHeader";

type AddTransactionScreenProps = {
  type: "income" | "expense";
};

export default function AddTransactionScreen({type,}: AddTransactionScreenProps) {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] =
  useState("Salary");
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState(new Date());

const categories =
  type === "income"
    ? incomeCategories
    : expenseCategories;

  return (
    <ScreenBackground>
       
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
         <ScreenHeader
  title={
    type === "income"
      ? "Add Income"
      : "Add Expense"
  }
/>
        <AmountInput
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.sectionTitle}>
  Category
</Text>

<View style={styles.categoryContainer}>
  {categories.map((item) => (
    <CategoryChip
      key={item}
      title={item}
      selected={selectedCategory === item}
      onPress={() => setSelectedCategory(item)}
    />
  ))}
</View>
<DatePickerField
  value={date}
  onChange={setDate}
/>
    <NotesInput
  value={notes}
  onChangeText={setNotes}
/>
    <SaveButton
  title={
    type === "income"
      ? "Save Income"
      : "Save Expense"
  }
  onPress={() => {
    console.log("Save pressed");
  }}
/>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
  color: colors.textPrimary,
  fontSize: typography.size.md,
  fontWeight: typography.weight.semibold,
  marginBottom: spacing.md,
},

categoryContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginBottom: spacing.xl,
},
});