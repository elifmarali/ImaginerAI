"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";

const PromptContext = createContext();

export function PromptProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [promptArray, setPromptArray] = useState([]);
  const [generateClicked, setGenerateClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dataResult, setDataResult] = useState();
  const excludedWords = ["of", "the", "a", "an"]; 

  useEffect(() => {
    const words = prompt
      .trim()
      .split(" ")
      .filter(
        (word) =>
          word !== "" && !excludedWords.includes(word.toLowerCase())
      );
      
    setPromptArray(words);
  }, [prompt]);
  

  const submitPrompt = async () => {
    if (promptArray.length === 0 || excludedWords.includes((item)=> item===prompt)) {
      setError(true)
    }
    setGenerateClicked(true);
    setLoading(true);
    const conditions = [];

    promptArray.forEach((word) => {
      // İlk olarak originalText ile tam eşleşme
      conditions.push({
        originalText: prompt.trim(),
      });

      // Eğer yukarıdaki koşul eşleşmezse translateText ile tam eşleşme
      conditions.push({
        translateText: prompt.trim(),
      });
    });

    // İlk iki koşul ile filtreyi oluşturuyoruz
    let filters = { $or: conditions };

    try {
      // İlk API isteğini gönderiyoruz (tam eşleşmeler için)
      let res = await axios.get("/api/imaginerData", {
        params: { filter: JSON.stringify(filters) },
      });

      if (res.data.length > 0) {
        setDataResult(res.data);
        setLoading(false);
        return; // Eğer veri bulunursa, işlemi sonlandırıyoruz
      }

      // Eğer veri dönmezse, ikinci aşama koşulları için filtreyi oluşturuyoruz
      const newConditions = [];
      promptArray.forEach((word) => {
        if (promptArray.length > 1) {
          // 3. koşul: originalTextArray ile kelime bazında eşleşme
          newConditions.push({
            originalTextArray: {
              $elemMatch: { $regex: word, $options: "i" },
            },
          });

          // 4. koşul: translateTextArray ile kelime bazında eşleşme
          newConditions.push({
            translateTextArray: {
              $elemMatch: { $regex: word, $options: "i" },
            },
          });
        }
      });

      // İkinci API isteğini gönderiyoruz (kelime bazında eşleşmeler için)
      filters = { $or: newConditions };
      res = await axios.get("/api/imaginerData", {
        params: { filter: JSON.stringify(filters) },
      });

      if (res.data.length > 0) {
        setDataResult(res.data);
      } else {
        console.warn("No results found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Hata oluştu:", error);
      setLoading(false);
      setError(true);
      setGenerateClicked(false);
    }
  };

  const data = {
    prompt,
    setPrompt,
    submitPrompt,
    dataResult,
    loading,
    error,
    generateClicked,
  };

  return (
    <PromptContext.Provider value={data}>{children}</PromptContext.Provider>
  );
}

export const usePrompt = () => {
  return useContext(PromptContext);
};
