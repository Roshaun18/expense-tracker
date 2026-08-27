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

export interface CreateExpenseRequest {
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  note?: string;
  date: string;
}

class ExpenseService {
  async getRecentExpenses(): Promise<Expense[]> {
    return await apiRequest("/expenses/recent", {
      method: "GET",
    });
  }
  async getExpenses(): Promise<Expense[]> {
    return await apiRequest("/expenses", {
      method: "GET",
    });
  }

  async createExpense(
    data: CreateExpenseRequest
  ): Promise<Expense> {
    return await apiRequest("/expenses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getExpenseById(id: string): Promise<Expense> {
  return await apiRequest(`/expenses/${id}`, {
    method: "GET",
  });
}

async updateExpense(
  id: string,
  data: CreateExpenseRequest
): Promise<Expense> {
  return await apiRequest(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

async deleteExpense(id: string): Promise<void> {
  await apiRequest(`/expenses/${id}`, {
    method: "DELETE",
  });
}
}

export default new ExpenseService();