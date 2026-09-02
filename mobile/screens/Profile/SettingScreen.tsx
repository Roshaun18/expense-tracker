import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import NotificationSettings from "../../components/profile/NotificationSettings";
import CurrencySelector from "../../components/profile/CurrencySelector";
import ScreenBackground from "../../components/common/ScreenBackground";
import ScreenHeader from "../../components/common/ScreenHeader";
import useProfile from "../../hooks/useProfile";
import userService from "../../services/userService";

import {
  colors,
  spacing,
  typography,
  radius,
} from "../../theme";

export default function EditProfileScreen() {
  const router = useRouter();

  const {
    profile,
    loading: profileLoading,
  } = useProfile();

  const [dailyReminders, setDailyReminders] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [currency, setCurrency] = useState("INR");

  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [name, setName] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLimit = async () => {
      try {
        const response = await userService.getMonthlyLimit();

        setMonthlyLimit(
          String(response.monthlyLimit ?? "")
        );
      } catch (error) {
        console.error(
          "Monthly limit error:",
          error
        );
      }
    };

    loadLimit();
  }, []);

  useEffect(() => {
  if (!profile) {
    return;
  }

  setCurrency(profile.currency || "INR");
  setDailyReminders(profile.dailyReminders);
  setBudgetAlerts(profile.budgetAlerts);
}, [profile]);

  const handleSave = async () => {
    const trimmedName = name.trim() || profile?.name?.trim() || "";

    if (trimmedName === "") {
      setError("Name is required");
      return;
    }

    const limit = Number(monthlyLimit);

    if (!Number.isFinite(limit) || limit <= 0) {
      setError(
        "Monthly limit must be greater than 0"
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      await userService.updateProfile(trimmedName);

      await userService.updateMonthlyLimit(limit);

      await userService.updateSettings(
  currency,
  dailyReminders,
  budgetAlerts
);

      router.back();
    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  if (profileLoading) {
    return (
      <ScreenBackground>
        <View style={styles.loading}>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <ScreenHeader title="Settings" />

          <View style={styles.form}>
            {/* NAME */}
            <Text style={styles.label}>
              Name
            </Text>

            <TextInput
              style={styles.input}
              value={name || profile?.name || ""}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={
                colors.textSecondary
              }
            />

            {/* EMAIL */}
            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.disabledInput,
              ]}
              value={profile?.email || ""}
              editable={false}
            />

            {/* MONTHLY LIMIT */}
            <Text style={styles.label}>
              Monthly Spending Limit
            </Text>

            <TextInput
              style={styles.input}
              value={monthlyLimit}
              onChangeText={setMonthlyLimit}
              placeholder="Enter monthly limit"
              placeholderTextColor={
                colors.textSecondary
              }
              keyboardType="numeric"
            />

            {/* CURRENCY */}
            <Text style={styles.sectionTitle}>
              CURRENCY
            </Text>

            <CurrencySelector
              selectedCurrency={currency}
              onSelect={setCurrency}
            />

            {/* NOTIFICATIONS */}
            <Text style={styles.sectionTitle}>
              NOTIFICATIONS
            </Text>

            <NotificationSettings
              dailyReminders={dailyReminders}
              budgetAlerts={budgetAlerts}
              onDailyRemindersChange={
                setDailyReminders
              }
              onBudgetAlertsChange={
                setBudgetAlerts
              }
            />

            {/* ERROR */}
            {error !== "" && (
              <Text style={styles.error}>
                {error}
              </Text>
            )}

            {/* SAVE */}
            <Pressable
              style={styles.button}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator
                  color={colors.textPrimary}
                />
              ) : (
                <Text style={styles.buttonText}>
                  Save Changes
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  form: {
    marginTop: spacing.xl,
  },

  label: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.input,
    color: colors.textPrimary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  disabledInput: {
    opacity: 0.6,
  },

  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.md,
  },

  buttonText: {
    color: colors.background,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
    marginBottom: spacing.md,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});