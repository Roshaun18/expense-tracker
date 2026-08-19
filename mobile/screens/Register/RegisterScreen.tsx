import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import ScreenBackground from "../../components/common/ScreenBackground";
import GlassCard from "../../components/common/GlassCard";
import TextField from "../../components/common/TextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import StepIndicator from "../../components/common/StepIndicator";
import Chip from "../../components/common/Chip";

import { router } from "expo-router";

import {
  colors,
  spacing,
  typography,
} from "../../theme";

import useRegister from "../../hooks/useRegister";

export default function RegisterScreen() {
  const {
    form,
    errors,
    step,
    loading,
    serverError,
    updateField,
    nextStep,
    previousStep,
    register,
  } = useRegister();

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>
          Expense Tracker
        </Text>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Create an account to start tracking your expenses
        </Text>

        <StepIndicator currentStep={step} />

        <GlassCard>

          {/* STEP 1 */}

          {step === 1 && (
            <>
              <TextField
                label="Full Name"
                placeholder="John Doe"
                value={form.fullName}
                error={errors.fullName}
                onChangeText={(text) =>
                  updateField("fullName", text)
                }
              />

              <TextField
                label="Email"
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                error={errors.email}
                onChangeText={(text) =>
                  updateField("email", text)
                }
              />

              <TextField
                label="Phone Number"
                placeholder="+91 9876543210"
                keyboardType="phone-pad"
                value={form.phone}
                error={errors.phone}
                onChangeText={(text) =>
                  updateField("phone", text)
                }
              />

              <PrimaryButton
                title="Continue"
                onPress={nextStep}
              />
            </>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <>
              <TextField
                label="Password"
                placeholder="••••••••"
                secureTextEntry
                value={form.password}
                error={errors.password}
                onChangeText={(text) =>
                  updateField("password", text)
                }
              />

              <TextField
                label="Confirm Password"
                placeholder="••••••••"
                secureTextEntry
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChangeText={(text) =>
                  updateField(
                    "confirmPassword",
                    text
                  )
                }
              />

              <View style={styles.passwordRequirements}>
                <Text style={styles.requirement}>
                  • At least 8 characters
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <PrimaryButton
                  title="Back"
                  style={{ flex: 1 }}
                  onPress={previousStep}
                />

                <PrimaryButton
                  title="Continue"
                  style={{ flex: 1 }}
                  onPress={nextStep}
                />
              </View>
            </>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <>
              <Text style={styles.sectionTitle}>
                Preferred Currency
              </Text>

              <View style={styles.chipContainer}>
                {["INR", "EUR", "USD", "GBP"].map(
                  (currency) => (
                    <Chip
                      key={currency}
                      title={currency}
                      selected={
                        form.currency === currency
                      }
                      onPress={() =>
                        updateField(
                          "currency",
                          currency
                        )
                      }
                    />
                  )
                )}
              </View>

              <Text style={styles.sectionTitle}>
                Interests
              </Text>

              <View style={styles.chipContainer}>
                {[
                  "Budgeting",
                  "Saving",
                  "Investing",
                  "Travel",
                  "Crypto",
                  "Business",
                ].map((interest) => (
                  <Chip
                    key={interest}
                    title={interest}
                    selected={form.interests.includes(
                      interest
                    )}
                    onPress={() => {
                      if (
                        form.interests.includes(
                          interest
                        )
                      ) {
                        updateField(
                          "interests",
                          form.interests.filter(
                            (i) => i !== interest
                          )
                        );
                      } else {
                        updateField(
                          "interests",
                          [
                            ...form.interests,
                            interest,
                          ]
                        );
                      }
                    }}
                  />
                ))}
              </View>

              <View style={styles.buttonRow}>
                <PrimaryButton
                  title="Back"
                  style={{ flex: 1 }}
                  onPress={previousStep}
                />

                <PrimaryButton
                  title="Continue"
                  style={{ flex: 1 }}
                  onPress={nextStep}
                />
              </View>
            </>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <>
              <Text style={styles.finishTitle}>
                You're All Set!
              </Text>

              {serverError !== "" && (
      <Text style={styles.serverError}>
        {serverError}
      </Text>
    )}

              <View style={styles.buttonRow}>
                <PrimaryButton
                  title="Back"
                  style={{ flex: 1 }}
                  onPress={previousStep}
                />

                <PrimaryButton
                  title="Create Account"
                  style={{ flex: 1 }}
                  loading={loading}
                  onPress={register}
                />
              </View>
            </>
          )}

        </GlassCard>

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text
            style={styles.signIn}
            onPress={() => router.back()}
          >
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  logo: {
    color: colors.primary,
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
    textAlign: "center",
    marginBottom: spacing.xxl,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    textAlign: "center",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.size.md,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
    lineHeight: typography.lineHeight.md,
  },

  footer: {
    marginTop: spacing.xl,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },

  signIn: {
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },

  passwordRequirements: {
    marginBottom: spacing.xl,
  },

  requirement: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginBottom: spacing.s,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.md,
  },

  finishTitle: {
    color: colors.textPrimary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  serverError: {
  color: colors.danger,
  textAlign: "center",
  marginBottom: spacing.md,
  fontSize: typography.size.sm,
},
});