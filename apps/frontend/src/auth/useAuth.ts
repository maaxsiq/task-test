import { useContext } from "react";
import { type AuthContextData, AuthContext } from "./auth.context";

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
