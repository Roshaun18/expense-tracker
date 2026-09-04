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
    await SecureStore.setItemAsync("userId", response.user.id);

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
    await SecureStore.deleteItemAsync("userId");
  }
}

export default new AuthService();