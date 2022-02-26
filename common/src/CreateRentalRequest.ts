import { CloudinaryImage } from "./CloudinaryImage";
import { Amenity } from "./Amenity";
import { RentalCategory } from "./RentalCategory";

export interface CreateRentalRequest {
	title: string;
	city: string;
	category: RentalCategory;
	numRooms: number;
	shared: boolean;
	description: string;
	dailyPrice: number;
	amenities: Array<Amenity>;
	image: CloudinaryImage
}