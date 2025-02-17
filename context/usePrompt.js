"use client";
import { createContext, useContext, useState } from "react";

const PromptContext = createContext();

export function PromptProvider({ children }) {
  const [prompt, setPrompt] = useState("");

  const submitPrompt = async () => {
    //api generate
  };
  const data = {
    prompt,
    setPrompt,
    submitPrompt,
  };
  return (
    <PromptContext.Provider value={data}>{children}</PromptContext.Provider>
  );
}

export const usePrompt = () => {
  const context = useContext(PromptContext);
  return context;
};
