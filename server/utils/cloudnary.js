import cloudinary  from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (fileBuffer, fileType) => {
   try {
     const base64Data = `data:${fileType};base64,${fileBuffer.toString(
       "base64"
     )}`;

     const result = await cloudinary.uploader.upload(base64Data, {
       resource_type: "auto", // Automatically detect file type
       folder: "user_images",
       use_filename: true,
       unique_filename: false,
     });

     return result;
   } catch (error) {
     console.error("Cloudinary upload error:", error); // Log the specific error
     throw new Error("Cloudinary upload failed");
   }
};

export default  uploadImageToCloudinary;
