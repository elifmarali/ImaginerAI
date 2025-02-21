import { Schema, models, model } from "mongoose";

const ImaginerSchema = new Schema({
  originalText:String,
  originalTextArray: [String],
  translateText:String,
  translateTextArray : [String],
  fileBase64: String,
});

const Imaginer = models.ImaginerData || model("ImaginerData", ImaginerSchema, "ImaginerData");

export default Imaginer;
