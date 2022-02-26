import { RentalCategory } from "./RentalCategory";
import { Amenity } from "./Amenity";
import { CloudinaryImage } from "./CloudinaryImage";

export interface Rental {
	_id: string;
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