import { useState } from "react";
import { api } from "../api/api";
import { AuthContext } from "./auth.context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  async function login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
