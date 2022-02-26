import express, { Request, Router, Response } from "express";
import { CloudinaryImageModel } from "../models/cloudinary-image";
import cloudUpload from "../services/cloudinary";
import datauri from "../services/dataUri";
import upload from "../services/multer";

const router: Router = express.Router();
const singleUpload = upload.single("image");

const singleUploadCtrl = (req: Request, res: Response, next: () => void) => {
    singleUpload(req, res, (error) => {
        if(error) {
            return res
                .status(400)
                .send({
                    errors: [
                        {
                            title: "Upload Error",
                            detail: error.message
                        }
                    ]
                });
        }

        next();
    });
};

router.post("", singleUploadCtrl, async (req, res) => {
    try {
        if(!req.file) {
            throw new Error("No image file found in request");
        }

        const base64Content = datauri(req.file).content as string;
        const result = await cloudUpload(base64Content);
        const cloudinaryId = result.public_id;
        const imageUrl = result.secure_url;
        const image = new CloudinaryImageModel({
            url: imageUrl,
            cloudinaryId: cloudinaryId
        });
        const savedImage = await image.save();

        return res.json({
            _id: savedImage.id,
            cloudinaryId: cloudinaryId,
            url: imageUrl
        });
    } catch (error) {
        return res
            .status(400)
            .send({
                errors: [
                    {
                        title: "Error",
                        detail: (error as Error)?.message
                    }
                ]
            });
    }
});

export default router;