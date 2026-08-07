import Tesseract from "tesseract.js";
// import cloudinary from "../config/cloudinary.js";

export const extractText = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(imagePath, "eng");
    return result.data.text;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
