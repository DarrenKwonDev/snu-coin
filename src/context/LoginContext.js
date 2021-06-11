import React, { createContext, useState } from "react";
import { LOGIN_KEY } from "../api";

export const LoginContext = createContext(null);

function LoginContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const store = {
    authenticated: {
      isAuthenticated,
      setIsAuthenticated,
    },
    userName: {
      name,
      setName,
    },
    loading: {
      isLoading,
      setIsLoading,
    },
    key: localStorage.getItem(LOGIN_KEY),
  };

  return (
    <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
  );
}

export default LoginContextProvider;
