import Tesseract from "tesseract.js";

export const extractText = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      "eng"
    );

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw error;
  }
};