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
        (word) => word !== "" && !excludedWords.includes(word.toLowerCase())
      );
    setPromptArray(words);
  }, [prompt]);

  const submitPrompt = async () => {
    if (
      promptArray.length === 0 ||
      excludedWords.includes((item) => item === prompt)
    ) {
      setError(true);
    }
    setGenerateClicked(true);
    setLoading(true);
    const conditions = [];

    promptArray.forEach((word) => {
      conditions.push({
        originalText: prompt.trim(),
      });
      conditions.push({
        translateText: prompt.trim(),
      });
      conditions.push({
        originalTextArray: { $elemMatch: { $regex: prompt, $options: "i" } },
      });
      conditions.push({
        translateTextArray: { $elemMatch: { $regex: prompt, $options: "i" } },
      });
    });

    let filters = { $or: conditions };

    try {
      let res = await axios.get("/api/imaginerData", {
        params: { filter: JSON.stringify(filters) },
      });

      if (res.data.length > 0) {
        setDataResult(res.data);
        setLoading(false);
        setError(false);
        return;
      }

      if (promptArray && promptArray.length > 1) {
        const newConditions = [];
        promptArray.forEach((word) => {
          if (promptArray.length > 1) {
            newConditions.push({
              originalTextArray: {
                $elemMatch: { $regex: word, $options: "i" },
              },
            });

            newConditions.push({
              translateTextArray: {
                $elemMatch: { $regex: word, $options: "i" },
              },
            });
          }
        });

        filters = { $or: newConditions };
        res = await axios.get("/api/imaginerData", {
          params: { filter: JSON.stringify(filters) },
        });

        if (res.data.length > 0) {
          setDataResult(res.data);
          setError(false);
        }
      } else {
        console.warn("No results found.");
      }

      // Google araması yapılacak
      if (res.data.length === 0) {
        console.log("GOOGLE ARAMASI YAPILACAK");

        // Google Custom Search API ile görsel arama yapılacak
        const searchQuery = prompt.trim();  // Arama yapılacak terim

        try {
          const googleRes = await axios.get(
            `https://www.googleapis.com/customsearch/v1`,
            {
              params: {
                q: searchQuery,
                //cx: "YOUR_CUSTOM_SEARCH_ENGINE_ID", // Arama motoru kimliği
                key: process.env.NEXT_PUBLIC_API_KEY, // Google API Anahtarı
                searchType: "image", // Görsel araması yap
              },
            }
          );

          if (googleRes.data.items && googleRes.data.items.length > 0) {
            // Arama sonuçlarından en çok uygun görseli seç
            const mostRelevantImage = googleRes.data.items[0].link; // İlk görseli al

            console.log("En uygun görsel:", mostRelevantImage);

            // Görseli kullanıcıya gösterebilir ve veritabanına kaydedebilirsiniz
            setDataResult([{ imageUrl: mostRelevantImage }]);
            setLoading(false);
          } else {
            console.warn("Google'dan sonuç bulunamadı.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Google araması sırasında hata:", error);
          setLoading(false);
          setError(true);
        }
      }
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
