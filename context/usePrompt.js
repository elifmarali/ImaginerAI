"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PromptContext = createContext();

export function PromptProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [promptArray, setPromptArray] = useState([]);
  const [generateClicked,setGenerateClicked]= useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [dataResult, setDataResult] = useState();

  useEffect(() => {
    const words = prompt
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    setPromptArray(words);
  }, [prompt]);

  const submitPrompt = async () => {
    if (promptArray.length === 0) {
      console.warn("Prompt is empty, search failed.");
      return;
    }
    setGenerateClicked(true);
    setLoading(true);
    setError(false);
    const conditions = [];

    promptArray.forEach((word) => {
      conditions.push({
        originalTextArray: {
          $elemMatch: { $regex: word, $options: "i" },
        },
      });
      conditions.push({
        translateTextArray: {
          $elemMatch: { $regex: word, $options: "i" },
        },
      });
      conditions.push({
        originalText: { $regex: word, $options: "i" },
      });
      conditions.push({
        translateText: { $regex: word, $options: "i" },
      });
    });

    // En az bir koşulun sağlanması için $or operatörü kullanılır.
    const filters = { $or: conditions };

    try {
      const res = await axios.get("/api/imaginerData", {
        params: { filter: JSON.stringify(filters) },
      });
      if (res) {
        if(res.data.length>1){
          await setDataResult(res.data);
        }else if(res.data.length===1){
          await setDataResult(res.data);
        }
        setLoading(false);
      };
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
    generateClicked
  };
  return (
    <PromptContext.Provider value={data}>{children}</PromptContext.Provider>
  );
}

export const usePrompt = () => {
  return useContext(PromptContext);
};
