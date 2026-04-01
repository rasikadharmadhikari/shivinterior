import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderByFieldname = {
  thumbnail: "shiv-interiors/thumbnails",
  beforeImages: "shiv-interiors/before",
  afterImages: "shiv-interiors/after",
  beforelmages: "shiv-interiors/before",
  afterimages: "shiv-interiors/after",
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => ({
    folder: folderByFieldname[file.fieldname] || "shiv-interiors/thumbnails",
    resource_type: "image",
  }),
});

const upload = multer({ storage });

export default upload;
export { upload };
