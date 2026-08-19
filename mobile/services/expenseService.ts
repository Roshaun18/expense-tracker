import { apiRequest } from "./api";

export interface Expense {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  note?: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

class ExpenseService {
  async getRecentExpenses(): Promise<Expense[]> {
    return await apiRequest("/expenses/recent", {
      method: "GET",
    });
  }
}

export default new ExpenseService();