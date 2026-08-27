import { apiRequest } from "./api";

export interface CategorySummary {
  category: string;
  amount: number;
}

class AnalyticsService {
  async getCategorySummary(): Promise<CategorySummary[]> {
    return await apiRequest("/analytics/category", {
      method: "GET",
    });
  }
}

export default new AnalyticsService();