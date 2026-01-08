import { createContext } from "react";

export interface AuthContextData {
  token: string | null;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);
