import { ScrollView, StyleSheet } from "react-native";

import ScreenBackground from "../../components/common/ScreenBackground";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenu from "../../components/profile/ProfileMenu";

import { spacing } from "../../theme";

import MonthlyLimitCard from "../../components/profile/MonthlyLimitCard";

export default function ProfileScreen() {
  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ProfileHeader />
        <MonthlyLimitCard />

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
});