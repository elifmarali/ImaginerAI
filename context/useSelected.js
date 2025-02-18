"use client";
import { useContext, useState } from "react";
import { createContext } from "react";

const SelectedContext = createContext();

export function SelectedProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState();

  const data = {
    selectedTab,
    setSelectedTab,
  };

  return (
    <SelectedContext.Provider value={data}>{children}</SelectedContext.Provider>
  );
}

export const useSelected = () => {
  const context = useContext(SelectedContext);
  return context;
};
