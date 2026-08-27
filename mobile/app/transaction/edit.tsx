import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import AmountInput from "../../components/transaction/AmountInput";
import CategoryChip from "../../components/transaction/CategoryChip";
import DatePickerField from "../../components/transaction/DatePickerField";
import NotesInput from "../../components/transaction/NotesInput";
import SaveButton from "../../components/transaction/SaveButton";

import {
  incomeCategories,
  expenseCategories,
} from "../../constants/transactionCategories";

import expenseService, {
  Expense,
} from "../../services/expenseService";

import {
  colors,
  spacing,
  typography,
} from "../../theme";

export default function EditTransaction() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [expense, setExpense] = useState<Expense | null>(null);

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadExpense = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        throw new Error("Invalid transaction ID");
      }

      const data = await expenseService.getExpenseById(id);

      setExpense(data);

      setAmount(String(data.amount));
      setSelectedCategory(data.category);
      setNotes(data.note ?? "");
      setDate(new Date(data.date));
    } catch (error) {
      console.error("Load edit transaction error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpense();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (!id || !expense) {
        setError("Invalid transaction");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      if (!selectedCategory) {
        setError("Please select a category");
        return;
      }

      setSaving(true);
      setError("");

      await expenseService.updateExpense(id, {
        title: expense.title,
        amount: Number(amount),
        category: selectedCategory,
        type: expense.type,
        note: notes,
        date: date.toISOString(),
      });

      console.log("Transaction updated:", id);

      router.back();
    } catch (error) {
      console.error("Update transaction error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update transaction");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.info}>
            Loading transaction...
          </Text>
        </View>
      </ScreenBackground>
    );
  }

  if (!expense) {
    return (
      <ScreenBackground>
        <View style={styles.container}>
          <ScreenHeader title="Edit Transaction" />

          <Text style={styles.error}>
            {error || "Transaction not found."}
          </Text>
        </View>
      </ScreenBackground>
    );
  }

  const categories =
    expense.type === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Edit Transaction" />

        {error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

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
            saving
              ? "Updating..."
              : "Update Transaction"
          }
          onPress={handleUpdate}
        />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: spacing.md,
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginBottom: spacing.lg,
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