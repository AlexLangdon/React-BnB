import config from "../config";
import cloudinary, { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET
});

const cloudUpload = (file: string): Promise<UploadApiResponse> => (
    cloudinary.v2.uploader.upload(file)
);

export default cloudUpload;