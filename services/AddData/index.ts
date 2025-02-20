import axios from "axios";

async function handleImage(file: File): Promise<string | null> {
  console.log("Selected file:", file);

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
  console.log("formattedImage : ",formattedImage);
  
  try {
    await axios.post("/api/imaginerData", {
      textArray, // String dizisi oluştur
      fileBase64: formattedImage,
    });

    console.log("Veri başarıyla kaydedildi!");
  } catch (error) {
    console.error("Dosya yükleme hatası:", error);
  }
};
