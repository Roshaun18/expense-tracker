import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors, spacing, typography } from "../../theme";

import useProfile from "../../hooks/useProfile";
import notificationStorage, {
  AppNotification,
} from "../../services/notificationStorage";
type HeaderProps = {
  name?: string;
  notificationCount: number;
  onNotificationPress: () => void;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning 👋";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon 👋";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening 👋";
  }

  return "Good Night 👋";
}

export default function Header({
  name,
  notificationCount,
  onNotificationPress,
}: HeaderProps) {
  const { profile } = useProfile();

  const userName = name || profile?.name || "User";

  const [greeting, setGreeting] = useState(getGreeting());


  const router = useRouter();
  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          {greeting}
        </Text>

        <Text style={styles.name}>
          {userName}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.iconContainer}>
  <Pressable onPress={onNotificationPress}>
    <Ionicons
      name="notifications-outline"
      size={22}
      color={colors.textPrimary}
    />

    {notificationCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {notificationCount > 9
            ? "9+"
            : notificationCount}
        </Text>
      </View>
    )}
  </Pressable>
</View>

        <View style={styles.avatar}>
          <Pressable onPress={()=>router.push("/(tabs)/profile")}>
          <Text style={styles.avatarText}>
            {userName.charAt(0)}
          </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: spacing.xl,
  },

  greeting: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },

  name: {
    marginTop: spacing.s,

    color: colors.textPrimary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    marginRight: spacing.md,
  },

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: colors.background,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  badge: {
  position: "absolute",
  top: -6,
  right: -8,
  minWidth: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: colors.danger,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 3,
},

badgeText: {
  color: colors.background,
  fontSize: 9,
  fontWeight: "bold",
},
});