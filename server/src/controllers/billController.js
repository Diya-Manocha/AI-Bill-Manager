import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { extractText } from "../services/orcService.js";
import { processBill } from "../services/aiService.js";
import Bill from "../models/Invoice.js";

export const uploadBill = async (req, res) => {
  try {
    console.log(req.file);
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "bill-manager",
    // });
    // const text = await extractText(result.secure_url);
    const text = await extractText(req.file.path);
    const billData = await processBill(text);

    const bill = new Bill({
      ...billData,
      // image: result.secure_url,
      image: req.file.path,
    });
    await bill.save();
    fs.unlinkSync(req.file.path);
    res.json({
      success: true,
      // image: result.secure_url,
      bill,
      message: "File recei  ved",
    });
  } catch (error) {
    console.error("Message:", error.message);
    console.error("HTTP Code:", error.http_code);
    console.error("Full Error:", JSON.stringify(error, null, 2));
    return res.status(500).json({
      success: false,
      message: "Failed to upload Invoice",
      error: error.message,
    });
  }
};

