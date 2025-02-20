import { initMongoose } from "../../libs/mongoose";
import Imaginer from "../../models/ImaginerData";

export default async function handler(req, res) {
    console.log("API Route Triggered: /api/imaginerData");

    await initMongoose();
    console.log("Connected to DB");

    if (req.method === "POST") {
        try {
            const { textArray, fileBase64 } = req.body;
            console.log("📌 Gelen veri:", { textArray, fileBase64 });

            if (!textArray || !fileBase64) {
                return res.status(400).json({ error: "Eksik veri: textArray veya fileBase64 bulunamadı" });
            }

            const newEntry = new Imaginer({
                textArray,
                fileBase64, // Base64 olarak kaydediyoruz
            });

            await newEntry.save();
            console.log("✅ Veri başarıyla kaydedildi:", newEntry);

            return res.status(201).json({ message: "Data saved successfully", data: newEntry });
        } catch (error) {
            console.error("🚨 Veritabanı kaydetme hatası:", error);
            return res.status(500).json({ error: "Database error", details: error.message });
        }
    } else if (req.method === "GET") {
        try {
            const imaginerData = await Imaginer.find().exec();
            console.log("Fetched imaginerData:", imaginerData);

            return res.status(200).json(imaginerData);
        } catch (error) {
            console.error("Error fetching data:", error);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
