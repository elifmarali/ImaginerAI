import { initMongoose } from "../../libs/mongoose";
import Imaginer from "../../models/ImaginerData";

export default async function handler(req, res) {
  console.log("API Route Triggered: /api/imaginerData");

  await initMongoose();
  console.log("Connected to DB");

  if (req.method === "POST") {
    try {
      const {
        originalText,
        originalTextArray,
        translateText,
        translateTextArray,
        fileBase64,
      } = req.body;
      console.log("📌 Gelen veri:", {
        originalText,
        originalTextArray,
        translateText,
        translateTextArray,
        fileBase64,
      });

      if (
        !originalText ||
        !originalTextArray ||
        !translateText ||
        !translateTextArray ||
        !fileBase64
      ) {
        return res
          .status(400)
          .json({ error: "Eksik veri: originalText, originalTextArray, translateText, translateTextArray veya fileBase64 bulunamadı" });
      }

      const newEntry = new Imaginer({
        originalText,
        originalTextArray,
        translateText,
        translateTextArray,
        fileBase64, // Base64 olarak kaydediyoruz
      });
      
      await newEntry.save();
      console.log("✅ Veri başarıyla kaydedildi:", newEntry);

      return res
        .status(201)
        .json({ message: "Data saved successfully", data: newEntry });
    } catch (error) {
      console.error("🚨 Veritabanı kaydetme hatası:", error);
      return res
        .status(500)
        .json({ error: "Database error", details: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { filter } = req.query;

      let filters = {};

      // Eğer filter varsa, filter'i JSON formatında parse ediyoruz
      if (filter) {
        filters = JSON.parse(filter);
      }

      console.log("Uygulanan Filtre:", filters);

      // MongoDB'ye filtreyi uygulayarak veri çekiyoruz
      const imaginerData = await Imaginer.find(filters).exec();
      console.log("Fetched imaginerData:", imaginerData);

      return res.status(200).json(imaginerData);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  }  else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
