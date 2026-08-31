import { apiRequest } from "./api";

export interface MonthlyLimitResponse {
  monthlyLimit: number;
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
}

export default new UserService();