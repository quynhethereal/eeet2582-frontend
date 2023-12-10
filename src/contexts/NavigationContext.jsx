import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
const NavigationContext = createContext();

export function useNavigation() {
  return useContext(NavigationContext);
}
export const NavigationProvider = ({ children }) => {
  const { isAuthenticated, error } = useAuth();
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    const navItems = [{ name: "Price", href: "/price", current: false }];
    if (isAuthenticated) {
      navItems.unshift({ name: "Home", href: "/home", current: true });
    } else {
      navItems.unshift({ name: "Intro", href: "/", current: true });
    }

    setNavigation(navItems);
  }, [isAuthenticated]);

  const handleNavigationClick = (name) => {
    setNavigation(
      navigation.map((item) => ({
        ...item,
        current: item.name === name,
      }))
    );
  };

  return (
    <NavigationContext.Provider value={{ navigation, handleNavigationClick }}>
      {children}
    </NavigationContext.Provider>
  );
};
