import React, { useState, createContext, useContext } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [navigation, setNavigation] = useState([
    { name: "Intro", href: "/", current: false },
    { name: "Home", href: "/home", current: false },
    { name: "Price", href: "#", current: false },
  ]);

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
