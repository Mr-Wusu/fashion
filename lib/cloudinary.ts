import { v2 as cloudinary } from "cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
}

// interface UploadableImage {
//   arrayBuffer(): Promise<ArrayBuffer>;
//   type: string;
// }

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function uploadImage(image: File): Promise<string> {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(imageData).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  const result = (await cloudinary.uploader.upload(fileUri, {
    folder: "clothes",
  })) as CloudinaryUploadResult;
  return result.secure_url;
}

export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract public_id from the Cloudinary URL
    // Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/clothes/sample.jpg
    const urlParts = imageUrl.split("/");
    const uploadIndex = urlParts.indexOf("upload");

    if (uploadIndex === -1) {
      throw new Error("Invalid Cloudinary URL");
    }

    // Get everything after "upload/v{version}/"
    const publicIdWithFolder = urlParts.slice(uploadIndex + 2).join("/");
    // Remove file extension
    const publicId = publicIdWithFolder.replace(/\.[^/.]+$/, "");

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
}