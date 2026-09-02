import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";

import ScreenBackground from "../../components/common/ScreenBackground";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenu from "../../components/profile/ProfileMenu";
import ProfileCard from "../../components/profile/ProfileCard";

import { spacing, colors, typography } from "../../theme";

import useProfile from "../../hooks/useProfile";

export default function ProfileScreen() {
  const {
  profile,
  loading,
  error,
} = useProfile();

if (loading) {
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

  if (error) {
    return (
      <ScreenBackground>
        <View style={styles.loading}>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.heading}>
          <Text style={styles.overline}>
            YOU
          </Text>

          <Text style={styles.title}>
            Profile
          </Text>
        </View>

        <ProfileCard
          name={profile?.name ?? "User"}
          email={profile?.email ?? ""}
        />

        <Text style={styles.sectionTitle}>
          ACCOUNT
        </Text>

        <ProfileMenu />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  
  heading: {
    marginBottom: spacing.xl,
  },

  overline: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    letterSpacing: 2,
    marginBottom: spacing.s,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },

  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    color: colors.danger,
    fontSize: typography.size.sm,
  },
});