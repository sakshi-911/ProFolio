import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "professor-portfolio",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "mp4", "mkv"],
    resource_type: "auto",
  },
});

const upload = multer({ storage });
export default upload;
