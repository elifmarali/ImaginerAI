import axios from "axios";
import translate from "translate";

async function handleImage(file: File): Promise<string | null> {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("File reading error"));
    reader.readAsDataURL(file);
  });
}


export const submitAddData = async (text: string, file: File) => {
  const formattedImage: any = await handleImage(file);
  const textArray = text.trim().split(" ");

  // Metin dili belirlenip, çeviri yapılır
  const detectedLang = /[a-zA-Z]/.test(text) ? "en" : "tr";
  const targetLang = detectedLang==="en" ? "tr" : "en";

  const translateText = await translate(text, {from:detectedLang,to:targetLang});
  const translateTextArray = translateText.trim().split(" ");

  try {
    await axios.post("/api/imaginerData", {
      originalText:text,
      originalTextArray:textArray,
      translateText,
      translateTextArray,
      fileBase64: formattedImage,
    });

    console.log("Veri başarıyla kaydedildi!");
  } catch (error) {
    console.error("Dosya yükleme hatası:", error);
  }
};
