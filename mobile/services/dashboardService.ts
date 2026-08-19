import { apiRequest } from "./api";

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

class DashboardService{
    async getSummary(): Promise<DashboardSummary> {
    return await apiRequest("/dashboard", {
      method: "GET",
    });
  }
}

export default new DashboardService();