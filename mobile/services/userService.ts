import { apiRequest } from "./api";

export interface MonthlyLimitResponse {
  monthlyLimit: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  monthlyLimit?: number;
  currency: string;
  dailyReminders: boolean;
  budgetAlerts: boolean;
}

class UserService {
  async getMonthlyLimit(): Promise<MonthlyLimitResponse> {
    return await apiRequest("/user/monthly-limit", {
      method: "GET",
    });
  }

  async updateMonthlyLimit(
    monthlyLimit: number
  ): Promise<MonthlyLimitResponse> {
    return await apiRequest("/user/monthly-limit", {
      method: "PUT",
      body: JSON.stringify({
        monthlyLimit,
      }),
    });
  }

  async getProfile(): Promise<UserProfile> {
    return await apiRequest("/user/profile", {
      method: "GET",
    });
  }

  async updateProfile(name: string) {
  return await apiRequest("/user/profile", {
    method: "PUT",
    body: JSON.stringify({
      name,
    }),
  });
}

  async updateSettings(
  currency: string,
  dailyReminders: boolean,
  budgetAlerts: boolean
) {
  return await apiRequest("/user/settings", {
    method: "PUT",
    body: JSON.stringify({
      currency,
      dailyReminders,
      budgetAlerts,
    }),
  });
}
}

export default new UserService();