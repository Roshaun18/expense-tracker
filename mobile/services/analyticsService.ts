import { apiRequest } from "./api";

export interface CategorySummary {
  category: string;
  amount: number;
}

export interface MonthlySummary {
  month: number;
  income: number;
  expense: number;
}

class AnalyticsService {
  async getCategorySummary(): Promise<CategorySummary[]> {
    return await apiRequest("/analytics/category", {
      method: "GET",
    });
  }

  async getMonthlySummary(): Promise<MonthlySummary[]> {
  return await apiRequest("/analytics/monthly", {
    method: "GET",
  });
}
}

export default new AnalyticsService();