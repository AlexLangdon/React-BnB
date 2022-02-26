import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface CloudinaryImage {
    cloudinaryId: string;
    url: string;
    createdAt: Date;
}

const cloudinaryImageSchema = new Schema({
    cloudinaryId: {type: String, required: true},
    url: { type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now}
});

export const CloudinaryImageModel = mongoose.model("CloudinaryImage", cloudinaryImageSchema);