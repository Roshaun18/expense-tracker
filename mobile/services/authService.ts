import * as SecureStore from "expo-secure-store";
import { LoginForm } from "../types/auth";
import { apiRequest } from "./api";

class AuthService {
  async login(data: LoginForm) {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    await SecureStore.setItemAsync("token", response.token);

    return response;
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    currency: string;
  }) {
    return await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout() {
    await SecureStore.deleteItemAsync("token");
  }
}

export default new AuthService();