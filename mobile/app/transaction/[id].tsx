import { useEffect, useState, useCallback } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";

import { useLocalSearchParams, router, useFocusEffect } from "expo-router";

import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import PrimaryButton from "../../components/common/PrimaryButton";

import expenseService, {
  Expense,
} from "../../services/expenseService";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

export default function TransactionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadExpense = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        throw new Error("Invalid transaction ID");
      }

      const data = await expenseService.getExpenseById(id);

      console.log("Transaction details:", data);

      setExpense(data);
    } catch (error) {
      console.error("Transaction details error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!id) {
      return;
    }

    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              setError("");

              await expenseService.deleteExpense(id);

              console.log("Transaction deleted:", id);

              router.back();
            } catch (error) {
              console.error(
                "Delete transaction error:",
                error
              );

              if (error instanceof Error) {
                setError(error.message);
              } else {
                setError("Failed to delete transaction");
              }

              setLoading(false);
            }
          },
        },
      ]
    );
  };

  useFocusEffect(useCallback(() => {
    loadExpense();
  }, [id])
);

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

  if (error) {
    return (
      <ScreenBackground>
        <View style={styles.container}>
          <ScreenHeader title="Transaction" />

          <Text style={styles.error}>
            {error}
          </Text>

          <PrimaryButton
            title="Go Back"
            onPress={() => router.back()}
          />
        </View>
      </ScreenBackground>
    );
  }

  if (!expense) {
    return (
      <ScreenBackground>
        <View style={styles.container}>
          <ScreenHeader title="Transaction" />

          <Text style={styles.info}>
            Transaction not found.
          </Text>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Transaction Details" />

        <View style={styles.card}>
          <Text style={styles.category}>
            {expense.category}
          </Text>

          <Text
            style={[
              styles.amount,
              expense.type === "income"
                ? styles.income
                : styles.expense,
            ]}
          >
            {expense.type === "income" ? "+" : "-"}₹
            {expense.amount.toLocaleString("en-IN")}
          </Text>

          <View style={styles.divider} />

          <DetailRow
            label="Title"
            value={expense.title}
          />

          <DetailRow
            label="Category"
            value={expense.category}
          />

          <DetailRow
            label="Type"
            value={expense.type}
          />

          <DetailRow
            label="Date"
            value={new Date(
              expense.date
            ).toLocaleDateString("en-IN")}
          />

          {expense.note && (
            <DetailRow
              label="Note"
              value={expense.note}
            />
          )}
        </View>

        <PrimaryButton
          title="Go Back"
          onPress={() => router.back()}
          style={styles.backButton}
        />

        <Pressable
  style={styles.editButton}
  onPress={() => {
    router.push({
      pathname: "/transaction/edit",
      params: {
        id: expense.id,
      },
    });
  }}
>
  <Text style={styles.editText}>
    Edit Transaction
  </Text>
</Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>
            Delete Transaction
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenBackground>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },

  info: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginTop: spacing.md,
    textAlign: "center",
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    textAlign: "center",
    marginVertical: spacing.xl,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  category: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginBottom: spacing.sm,
  },

  amount: {
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
  },

  income: {
    color: colors.income,
  },

  expense: {
    color: colors.expense,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  label: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },

  value: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    textAlign: "right",
  },

  deleteButton: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.danger,
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
  },

  deleteText: {
    color: colors.danger,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  editButton: {
  height: 58,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: radius.full,
  borderWidth: 1,
  borderColor: colors.primary,
  marginBottom: spacing.md,
},

editText: {
  color: colors.primary,
  fontSize: typography.size.md,
  fontWeight: typography.weight.bold,
},

backButton: {
  marginBottom: spacing.md,
},
});