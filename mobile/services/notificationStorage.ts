import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "warning" | "exceeded";
  createdAt: string;
}

const getNotificationKey = async () => {
  const userId = await SecureStore.getItemAsync("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  return `@expense_tracker_notifications_${userId}`;
};

class NotificationStorage {
  async getNotifications(): Promise<AppNotification[]> {
    try {
      const key = await getNotificationKey();
      const stored = await AsyncStorage.getItem(key);

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
      const key = await getNotificationKey();
      const notifications = await this.getNotifications();

      notifications.unshift(notification);

      await AsyncStorage.setItem(
        key,
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
      const key = await getNotificationKey();
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(
        "Failed to clear notifications:",
        error
      );
    }
  }
}

export default new NotificationStorage();