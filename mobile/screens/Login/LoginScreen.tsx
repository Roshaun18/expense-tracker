import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GlassCard from "../../components/common/GlassCard";
import ScreenBackground from "../../components/common/ScreenBackground";
import TextField from "../../components/common/TextField";
import GradientButton from "../../components/common/GradientButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors, spacing, typography } from "../../theme";
import { router } from "expo-router";
import useLogin from "../../hooks/useLogin";

export default function LoginScreen() {
  const {
  form,
  errors,
  loading,
  updateField,
  login,
} = useLogin();
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Text style={styles.logo}>Expense Tracker</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue managing your expenses
        </Text>

        <GlassCard>
          <TextField
            label="Email"
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            error={errors.email}
            onChangeText={(text)=> updateField("email",text)}
          />

          <TextField
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={form.password}
            error={errors.password}
            onChangeText={(text)=>updateField("password",text)}
          />

          <PrimaryButton
          title="Sign In"
          loading={loading}
          onPress={login}
/>
        </GlassCard>

        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Text style={styles.signUp} onPress={()=>router.push("/register")}>Sign Up</Text>
        </Text>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
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
  },

  form: {
    width: "100%",
  },

  footer: {
    marginTop: spacing.xl,
    color: colors.textSecondary,
    textAlign: "center",
    fontSize: typography.size.sm,
  },

  signUp: {
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },
});