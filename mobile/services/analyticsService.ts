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

export interface PeriodSummary {
  income: number;
  expense: number;
}

class AnalyticsService {
  async getCategorySummary(
  period: "W" | "M" | "Y"
): Promise<CategorySummary[]> {
  return await apiRequest(
    `/analytics/category?period=${period}`,
    {
      method: "GET",
    }
  );
}

  async getMonthlySummary(): Promise<MonthlySummary[]> {
  return await apiRequest("/analytics/monthly", {
    method: "GET",
  });
}

async getPeriodSummary(
    period: "W" | "M" | "Y"
  ): Promise<PeriodSummary> {
    return await apiRequest(
      `/analytics/summary?period=${period}`,
      {
        method: "GET",
      }
    );
  }
}

export default new AnalyticsService();