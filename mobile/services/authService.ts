import { LoginForm, RegisterForm } from "../types/auth";

class AuthService {
  async login(data: LoginForm) {
    // TODO:
    // Replace this with the backend API call.

    console.log("Login Request:", data);

    return {
      success: true,
      message: "Login successful",
    };
  }

  async register(data: RegisterForm) {
    // TODO:
    // Replace this with the backend API call.

    console.log("Register Request:", data);

    return {
      success: true,
      message: "Registration successful",
    };
  }

  async logout() {
    // TODO:
    // Remove token and call backend if needed.

    console.log("Logout");
  }
}

export default new AuthService();