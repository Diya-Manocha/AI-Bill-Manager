import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
  const result = await cloudinary.uploader.upload("./uploads/bill.png");
  console.log(result);
} catch (err) {
  console.dir(err, { depth: null });
}