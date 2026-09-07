import * as Notifications from "expo-notifications";
import notificationStorage from "./notificationStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  async requestPermission() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus === "granted") {
      return true;
    }

    const { status } =
      await Notifications.requestPermissionsAsync();

    return status === "granted";
  }

  async registerPushToken(): Promise<string | null> {
  const hasPermission = await this.requestPermission();

  if (!hasPermission) {
    console.log("Notification permission not granted");
    return null;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync()
  ).data;

  console.log("Expo Push Token:", token);

  return token;
}

  async scheduleDailyReminder() {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Expense Reminder",
        body: "Don't forget to record today's expenses.",
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 9,
        minute: 0,
      },
    });

    await Notifications.scheduleNotificationAsync({
    content: {
      title: "Expense Check",
      body: "You haven't recorded any expenses today.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 21,
      minute: 0,
    },
  });
  }

  async sendBudgetAlert(
    spent: number,
    monthlyLimit: number,
    currency: string,
    level: "warning" | "exceeded"
  ) {
    if (monthlyLimit <= 0) {
      return;
    }

    const percentage =
      (spent / monthlyLimit) * 100;

    let title = "";
    let body = "";

    if (level === "exceeded") {
      title = "🚨 Budget Exceeded";

      body =
        `You've spent ${currency} ${spent.toFixed(2)}, ` +
        `which is over your monthly budget of ` +
        `${currency} ${monthlyLimit.toFixed(2)}.`;
    } else if (level === "warning") {
      title = "⚠️ Budget Alert";

      body =
        `You've used ${percentage.toFixed(0)}% ` +
        `of your monthly budget ` +
        `(${currency} ${spent.toFixed(2)} of ` +
        `${currency} ${monthlyLimit.toFixed(2)}).`;
    } else {
      return;
    }

    // Save notification for the dashboard bell
    await notificationStorage.addNotification({
      id: `${level}-${Date.now()}`,
      title,
      message: body,
      type: level,
      createdAt: new Date().toISOString(),
    });

    // Show mobile notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  }
}

export default new NotificationService();