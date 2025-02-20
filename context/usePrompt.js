"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const PromptContext = createContext();

export function PromptProvider({ children }) {
  const [prompt, setPrompt] = useState("");

  const submitPrompt = async () => {

/*     // başarılı
    const res = await axios.get("/api/imaginerData")
    console.log(res); 
     */
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
