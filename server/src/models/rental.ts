import { Document, Schema } from "mongoose";
import mongoose from "mongoose";
import { RentalCategory, Amenity } from "react-bnb-common";
import { CloudinaryImage } from "./cloudinary-image";

interface Rental {
	title: string;
	city: string;
	category: RentalCategory;
	image: CloudinaryImage;
	numRooms: number;
	shared: boolean;
	description: string;
	dailyPrice: number;
	amenities: Array<Amenity>;
}

interface RentalDocument extends Rental, Document {}

export const rentalSchema = new Schema<RentalDocument>({
	title: {
		type: String,
		minLength: [4, "Invalid length. Minimum length is 4 characters"],
		maxLength: [80, "Invalid length. Maximum length is 80 characters"],
		required: "Title is required"
	},
	city: {
		type: String,
		required: "City is required"
	},
	category: {
		type: String,
		required: "Category is required"
	},
	image: {
		type: Schema.Types.ObjectId,
		ref: "CloudinaryImage"
	},
	numRooms: {
		type: Number,
		required: "Number of rooms is required"
	},
	shared: {
		type: Boolean,
		required: "Shared is required"
	},
	description: {
		type: String,
		required: "Description is required"
	},
	dailyPrice: {
		type: Number,
		required: "Daily price is required"
	},
	amenities: {
		type: [String]
	}
});

export const RentalModel = mongoose.model("Rental", rentalSchema);