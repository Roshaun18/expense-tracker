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
import TextField from "../../components/common/TextField";
import expenseService from "../../services/expenseService";
import { router } from "expo-router";

type AddTransactionScreenProps = {
  type: "income" | "expense";
};

export default function AddTransactionScreen({type,}: AddTransactionScreenProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
      type === "income"
        ? "Salary"
        : expenseCategories[0]
    );
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const categories =
  type === "income"
    ? incomeCategories
    : expenseCategories;

    const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!amount.trim()) {
      setError("Please enter an amount");
      return;
    }

    const numericAmount = Number(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await expenseService.createExpense({
        title: title.trim(),
        amount: numericAmount,
        category: selectedCategory,
        type,
        note: notes.trim(),
        date: date.toISOString(),
      });

      console.log(
        "Transaction created successfully"
      );

      router.back();
    } catch (error) {
      console.error(
        "Create transaction error:",
        error
      );

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create transaction");
      }
    } finally {
      setLoading(false);
    }
  };

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
<TextField
          label="Title"
          placeholder={
            type === "income"
              ? "Salary"
              : "Coffee"
          }
          value={title}
          onChangeText={setTitle}
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
{error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

    <SaveButton
  title={
    type === "income"
      ? "Save Income"
      : "Save Expense"
  }
  loading={loading}
          onPress={handleSave}
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

error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginBottom: spacing.md,
  },
});