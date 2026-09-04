import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "warning" | "exceeded";
  createdAt: string;
}

const NOTIFICATION_KEY = "@expense_tracker_notifications";

class NotificationStorage {
  async getNotifications(): Promise<AppNotification[]> {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATION_KEY);

      if (!stored) {
        return [];
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error(
        "Failed to load notifications:",
        error
      );

      return [];
    }
  }

  async addNotification(
    notification: AppNotification
  ): Promise<void> {
    try {
      const notifications = await this.getNotifications();

      notifications.unshift(notification);

      await AsyncStorage.setItem(
        NOTIFICATION_KEY,
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error(
        "Failed to save notification:",
        error
      );
    }
  }

  async clearNotifications(): Promise<void> {
    try {
      await AsyncStorage.removeItem(NOTIFICATION_KEY);
    } catch (error) {
      console.error(
        "Failed to clear notifications:",
        error
      );
    }
  }
}

export default new NotificationStorage();