import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, typography, radius } from "../../theme";
import { AppNotification } from "../../services/notificationStorage";

type NotificationPanelProps = {
  notifications: AppNotification[];
  onClear: () => void;
};

export default function NotificationPanel({
  notifications,
  onClear,
}: NotificationPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>

        {notifications.length > 0 && (
          <Pressable onPress={onClear}>
            <Text style={styles.clear}>Clear</Text>
          </Pressable>
        )}
      </View>

      {notifications.length === 0 ? (
        <Text style={styles.empty}>
          No notifications
        </Text>
      ) : (
        notifications.map((notification) => (
          <View
            key={notification.id}
            style={styles.notification}
          >
            <Text style={styles.notificationTitle}>
              {notification.title}
            </Text>

            <Text style={styles.message}>
              {notification.message}
            </Text>

            <Text style={styles.time}>
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  clear: {
    color: colors.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },

  empty: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },

  notification: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  notificationTitle: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.s,
  },

  message: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },

  time: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.s,
  },
});