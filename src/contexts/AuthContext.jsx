import { createContext, useContext, useEffect } from "react";
import useOidcAuth from "../hooks/useOidcAuth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = useOidcAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
